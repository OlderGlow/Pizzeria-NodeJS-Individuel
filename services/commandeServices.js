import { Commande } from '../models/commande.js'
import { CommandePizza, User } from '../models/user.js'
import { Livreur } from '../models/livreur.js'
import { Pizza } from '../models/pizza.js'
import { Promotion } from '../models/promotion.js'

export const getAllCommandes = async () => {
  return await Commande.findAll({ include: { all: true, nested: true }, order: [['id', 'DESC']] })
}
export const deleteCommande = (req, res) => {
  const { id } = req.query
  Commande.destroy({ where: { id } }).then(() => {
    res.redirect('/admin/commandes')
  })
}
export const getOneCommande = async (req, res) => {
  const { id } = req.query

  const livreurs = await Livreur.findAll()
  const commande = await Commande.findOne({ where: { id }, include: { all: true, nested: true } })
  const pizzas = await Pizza.findAll({ where: { isActive: true }, include: { all: true, nested: true } })
  const pizzasNotInCommande = pizzas.filter(pizza => {
    return !(commande.pizzas.map((p) => p.id).includes(pizza.id))
  })
  return res.render('admin/commandes/edit', {
    commande, pizzasNotInCommande, livreurs, active: 'commandes-home',
    error: false
  })
}
export const getCommandeApi = async (req, res) => {
  const { id } = req.query
  return await Commande.findOne({ where: { id }, include: { all: true, nested: true } })
}
export const showAddCommande = async (req, res) => {
  const allUsers = await User.findAll({ where: { isAdmin: false }, include: { all: true, nested: true } })
  const allLivreurs = await Livreur.findAll()
  const allPizzas = await Pizza.findAll({ where: { isActive: true } })
  await res.render('admin/commandes/add', {
    allUsers, allLivreurs, allPizzas, active: 'commandes-home',
    error: false
  })
}
export const addCommande = async (req, res) => {
  let prixTotal = 0
  const { userId, livreurId, pizzaId, addressId, quantity, discount } = req.body
  if (discount) {
    const promotion = await Promotion.findOne({ where: { name: discount } })
    if (promotion) {
      if (!Array.isArray(pizzaId)) {
        prixTotal += (await Pizza.findOne({ where: { id: pizzaId } })).price * quantity
        prixTotal *= (1 - (await promotion.discount / 100))
      } else {
        for (let i = 0; i < pizzaId.length; i++) {
          const pizza = await Pizza.findOne({ where: { id: pizzaId[i] } })
          prixTotal += await pizza.price * quantity[i]
          prixTotal *= (1 - (await promotion.discount / 100))
        }
      }
      const commande = await Commande.create({
        status: 1,
        prixTotal: prixTotal,
        userId,
        livreurId,
        addressId,
        promotionId: promotion.id
      })
      if (!Array.isArray(pizzaId)) {
        await commande.addPizza(pizzaId, { through: { quantite: quantity } })
      } else {
        for (let i = 0; i < pizzaId.length; i++) {
          if (quantity[i] > 0) {
            await commande.addPizza(pizzaId[i], { through: { quantite: quantity[i] } })
          }
        }
      }
      return commande
    } else {
      return res.render('admin/commandes/add', {
        error: 'Code promo invalide !',
        active: 'commandes-home',
        allUsers: await User.findAll({ where: { isAdmin: false }, include: { all: true, nested: true } }),
        allLivreurs: await Livreur.findAll(),
        allPizzas: await Pizza.findAll({ where: { isActive: true } })
      })
    }

  } else {
    if (!Array.isArray(pizzaId)) {
      prixTotal += (await Pizza.findOne({ where: { id: pizzaId } })).price * quantity
    } else {
      for (let i = 0; i < pizzaId.length; i++) {
        const pizza = await Pizza.findOne({ where: { id: pizzaId[i] } })
        prixTotal += await pizza.price * quantity[i]
      }
    }
    const commande = await Commande.create({ status: 1, prixTotal: prixTotal, userId, livreurId, addressId })
    if (!Array.isArray(pizzaId)) {
      await commande.addPizza(pizzaId, { through: { quantite: quantity } })
    } else {
      for (let i = 0; i < pizzaId.length; i++) {
        if (quantity[i] > 0) {
          await commande.addPizza(pizzaId[i], { through: { quantite: quantity[i] } })
        }
      }
    }
    return commande
  }
}
export const editOneCommande = async (req, res, io) => {
  let totalPrice = 0

  const { id, livreurId, pizzaId, address, quantity, status, userId } = req.body
  const commande = await Commande.findOne({ where: { id } })
  if (!Array.isArray(pizzaId)) {
    totalPrice += (await Pizza.findOne({ where: { id: pizzaId } })).price * quantity
  } else {
    for (let i = 0; i < pizzaId.length; i++) {
      const pizza = await Pizza.findOne({ where: { id: pizzaId[i] } })
      totalPrice += await pizza.price * quantity[i]
    }
  }

  await Commande.update({ status, prixTotal: totalPrice, livreurId, addressId: address, userId }, { where: { id } })

  if (!Array.isArray(quantity)) {
    await CommandePizza.update({ quantite: quantity }, { where: { commandeId: id, pizzaId: pizzaId } })
  } else {
    for (let i = 0; i < quantity.length; i++) {
      if (quantity[i] > 0) {
        const pizzaAlreadyInCommande = await CommandePizza.findOne({ where: { commandeId: id, pizzaId: pizzaId[i] } })
        if (pizzaAlreadyInCommande) {
          await CommandePizza.update({ quantite: quantity[i] }, { where: { commandeId: id, pizzaId: pizzaId[i] } })
        } else {
          const actualCommande = await Commande.findOne({ where: { id } })
          await actualCommande.addPizza(pizzaId[i], { through: { quantite: quantity[i] } })
        }
      }
    }
  }

  if (await commande.status !== status) {
    io.emit('commande-status-changed', {
      message: `La commande ${commande.id} a changé de statut pour ${commande.status} à ${status}`,
      link: 'http://localhost:8000/admin/commandes/edit?id=' + commande.id
    })
  }
  await res.redirect('/admin/commandes')
}