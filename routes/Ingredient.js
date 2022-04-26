import {
  addIngredients,
  deleteOneIngredient,
  editOneIngredient,
  getAllIngredients,
  getOneIngredient
} from '../services/Ingredients.js'

export const Ingredients = (app) => {
  app.get('/admin/ingredients/', (req, res) => {
    getAllIngredients().then(ingredients => {
      res.render('admin/ingredients/home', {
        ingredients: ingredients,
        error: false,
        active: 'ingredients-home'
      })
    })
  })
  app.get('/admin/ingredients/add', (req, res) => {
    res.render('admin/ingredients/add', {
      error: false,
      active: 'ingredients-home'
    })
  })
  app.get('/admin/ingredients/edit', (req, res) => {
    getOneIngredient(req, res).then((ingredient) => res.render('admin/ingredients/edit', {
      error: false,
      active: 'ingredients-home',
      ingredient
    }))
  })
  app.post('/admin/ingredients/add', (req, res) => {
    addIngredients(req, res).then(() => {
      res.redirect('/admin/ingredients/')
    })
  })
  app.post('/admin/ingredients/edit', (req, res) => {
    editOneIngredient(req, res).then(() => {
      res.redirect('/admin/ingredients/')
    })
  })
  app.delete('/admin/ingredients/delete', (req, res) => {
    deleteOneIngredient(req, res).then(() => {
      res.redirect('/admin/ingredients/')
    })
  })
}