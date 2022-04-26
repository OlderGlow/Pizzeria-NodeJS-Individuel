import { Ingredients } from '../models/ingredients.js'

export const getAllIngredients = async () => {
  return await Ingredients.findAll()
}
export const addIngredients = async (req, res) => {
  const { name, qteStock } = req.body

  if (!name || !qteStock) {
    return
  } else {
    return await Ingredients.create({
      name,
      qteStock
    })

  }

}
export const editOneIngredient = async (req, res) => {
  const { id } = req.query
  const { name, qteStock } = req.body

  if (!name || !qteStock) {
    res.redirect('/admin/ingredients')
  } else {
    return await Ingredients.update({
      name,
      qteStock
    }, { where: { id } })
  }
}
export const getOneIngredient = async (req, res) => {
  const { id } = req.query
  return await Ingredients.findOne({ where: { id } })
}
export const deleteOneIngredient = async (req, res) => {
  const { id } = req.query
  return await Ingredients.destroy({ where: { id } })
}