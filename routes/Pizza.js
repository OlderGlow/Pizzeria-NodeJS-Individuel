import { addPizza, deletePizza, editPizza, getAllPizzas, getOnePizza, viewAddPizza } from '../services/pizzaServices.js'

export const Pizza = (app, io) => {
  app.get('/admin/pizzas', (req, res) => {
    if (req.cookies.accesstoken) {
      getAllPizzas(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/pizzas/add', (req, res) => {
    if (req.cookies.accesstoken) {
      viewAddPizza(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/pizzas/add', (req, res) => {
    if (req.cookies.accesstoken) {
      addPizza(req, res, io).then(() => console.log('Pizza added'))
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/pizzas/edit', (req, res) => {
    if (req.cookies.accesstoken) {
      getOnePizza(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/pizzas/edit', (req, res) => {
    if (req.cookies.accesstoken) {
      editPizza(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.delete('/admin/pizzas/delete', (req, res) => {
    if (req.cookies.accesstoken) {
      deletePizza(req, res).then(() => {
        res.redirect('/admin/pizzas')
      })
    } else {
      res.redirect('/login')
    }
  })
}