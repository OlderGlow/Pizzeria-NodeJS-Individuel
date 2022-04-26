import { Pizza } from '../models/pizza.js'
import { Ingredients } from '../models/ingredients.js'
import { Sequelize } from 'sequelize'

export const getAllPizzas = (req, res) => {
  Pizza.findAll({include: [Ingredients]})
    .then(pizzas => {
      res.render('admin/pizzas/home', { pizzas, active: 'pizzas-home' })
    })
}
export const addPizza = async (req, res, io) => {
  const { code, name, ingredientId, category, price, quantity } = req.body
  const p = await Pizza.findOne({ where: { code } })
  const ingredients = await Ingredients.findAll()
  if (!code || !name || !ingredientId || !category || !price || !quantity) {
    return res.render('admin/pizzas/add', {
      error: 'Tous les champs sont obligatoires', active: 'pizzas-home', ingredients
    })
  } else if (isNaN(price) || quantity.forEach(isNaN)) {
    return res.render('admin/pizzas/add', {
      error: 'Le prix et la quantité doivent être des nombres', active: 'pizzas-home', ingredients
    })
  } else if (p) {
    return res.render('admin/pizzas/add', {
      error: 'Ce code existe déjà', active: 'pizzas-home', ingredients
    })
  } else if (price < 0 || quantity < 0) {
    return res.render('admin/pizzas/add', {
      error: 'Le prix et la quantité doivent être positifs', active: 'pizzas-home', ingredients
    })
  } else if (price > 500) {
    return res.render('admin/pizzas/add', {
      error: 'Le prix ne peut pas dépasser 500€', active: 'pizzas-home', ingredients
    })
  } else {
    const pizza = await Pizza.create({
      code,
      name,
      category,
      price,
      version_pizza: 1,
      isActive: true
    })

    if (!Array.isArray(ingredientId)) {
      await pizza.addIngredient(ingredientId, { through: { quantite: quantity } })
    } else {
      for (let i = 0; i < ingredientId.length; i++) {
        if (quantity[i] > 0) {
          await pizza.addIngredient(ingredientId[i], { through: { quantite: quantity[i] } })
          // Permet de mettre à jour le stock des ingrédients en fonction de la quantité utilisée pour la création de la pizza
/*
          await Ingredients.update({ qteStock: Sequelize.literal('qteStock - ' + quantity[i]) }, { where: { id: ingredientId[i] } })
*/
        }
      }
    }

    io.emit('newPizza', {
      message: 'Nouvelle pizza enregistrée',
      data: name
    })

    await res.redirect('/admin/pizzas')
  }

}
export const getOnePizza = async (req, res) => {
  const { id } = req.query

  const pizza = await Pizza.findOne({ where: { id }, include: [{ model: Ingredients, as: 'ingredients' }] })
  // get all ingredients except the one already used in the pizza
  const ingredients = await Ingredients.findAll({ where: { id: { [Sequelize.Op.notIn]: pizza.ingredients.map(ingredient => ingredient.id) } } })
  res.render('admin/pizzas/edit', { pizza, ingredients, error: false, active: 'pizzas-home' })

}
export const editPizza = async (req, res) => {

  const { id } = req.query

  const pizza = await Pizza.findOne({ where: { id }, include: [{ model: Ingredients, as: 'ingredients' }] })

  const { ingredientId, category, price, quantity } = req.body

  if (!ingredientId || !category || !price || !quantity) {
    return res.render('admin/pizzas/edit', {
      pizza,
      error: 'Tous les champs sont obligatoires'
    })
  }

  if (price < 0) {
    return res.render('admin/pizzas/edit', {
      pizza,
      error: 'Le prix doit être positif'
    })
  }

  if (price > 500) {
    return res.render('admin/pizzas/edit', {
      pizza,
      error: 'Le prix ne peut pas dépasser 500€'
    })
  }

  if(isNaN(price) || quantity.forEach(isNaN)) {
    return res.render('admin/pizzas/edit', {
      pizza,
      error: 'Le prix et la quantité doivent être des nombres'
    })
  }

  await Pizza.update({ isActive: false }, { where: { id } })

  const newPizza = await Pizza.create({
    code: pizza.code,
    name: pizza.name,
    category,
    price,
    version_pizza: parseInt(pizza.version_pizza) + 1,
    isActive: true
  })

  if (!Array.isArray(ingredientId)) {
    await newPizza.addIngredient(ingredientId, { through: { quantite: quantity } })
  } else {
    for (let i = 0; i < ingredientId.length; i++) {
      if (quantity[i] > 0) {
        await newPizza.addIngredient(ingredientId[i], { through: { quantite: quantity[i] } })
        // Permet de mettre à jour le stock des ingrédients en fonction de la quantité utilisée pour la création de la pizza
       /* await Ingredients.update({ qteStock: Sequelize.literal('qteStock - ' + quantity[i]) }, { where: { id: ingredientId[i] } })*/
      }
    }
  }

  await res.redirect('/admin/pizzas')

}
export const deletePizza = async (req, res) => {
  const { id } = req.query
  await Pizza.destroy({ where: { id } })
}
export const viewAddPizza = async (req, res) => {
  Ingredients.findAll()
    .then(ingredients => {
      res.render('admin/pizzas/add', { ingredients, error: false, active: 'pizzas-home' })
    })
}