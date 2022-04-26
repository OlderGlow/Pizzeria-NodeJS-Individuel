import { CommandePizza, User } from '../models/user.js'
import { Pizza } from '../models/pizza.js'
import { Sequelize } from 'sequelize'
import { Commande } from '../models/commande.js'
import { Livreur } from '../models/livreur.js'

export const getAllStats = async (req, res) => {
  const commandes = await CommandePizza.findAll({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('quantite')), 'quantite'],
      [Sequelize.col('pizzaId'), 'pizzaId']
    ],
    group: ['pizzaId'],
    order: [[Sequelize.literal('max(quantite)'), 'DESC']],
    limit: 5,
  })

  const usersTop5 = await Commande.findAll({
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('userId')), 'totalCommandes']
    ],
    group: ['userId'],
    order: [[Sequelize.literal('count(userId)'), 'DESC']],
    limit: 5,
    include: User
  })
  const livreursTop5 = await Commande.findAll({
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('livreurId')), 'totalCommandes']
    ],
    group: ['livreurId'],
    order: [[Sequelize.literal('count(livreurId)'), 'DESC']],
    limit: 5,
    include: Livreur
  })

  const pizzas = await Pizza.findAll({
    where: {
      id: commandes.map(commande => commande.pizzaId)
    }
  })

  await res.render('admin/statistiques/home', {
    active: 'statistiques-home',
    error: false,
    pizzas,
    commandes,
    usersTop5,
    livreursTop5
  })

};