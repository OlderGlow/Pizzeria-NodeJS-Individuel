import { addDessert, deleteDessert, editDessert, getAllDesserts, getOneDessert } from '../services/dessertServices.js'

export const Dessert = (app) => {
  app.get('/admin/desserts', async (req, res) => {
    const dessert = await getAllDesserts()
    await res.render('admin/desserts/home', {
      desserts: dessert,
      active: 'desserts-home',
      error: false
    })
  })
  app.get('/admin/desserts/add', async (req, res) => {
    await res.render('admin/desserts/add', {
      active: 'desserts-add',
      error: false
    })
  })
  app.post('/admin/desserts/add', async (req, res) => {
    const dessert = await addDessert(req, res)
    if(dessert) {
      await res.redirect('/admin/desserts')
    }
  })
  app.get('/admin/desserts/edit', async (req, res) => {
    const dessert = await getOneDessert(req, res)
    res.render('admin/desserts/edit', {
      active: 'desserts-edit',
      dessert: dessert,
      error: false
    })
  })
  app.post('/admin/desserts/edit', async (req, res) => {
    const dessert = await editDessert(req, res)
    if(dessert) {
      await res.redirect('/admin/desserts')
    }
  })
  app.delete('/admin/desserts/delete', async (req, res) => {
    const dessert = await deleteDessert(req, res)
    if(dessert) {
      await res.redirect('/admin/desserts')
    }
  })
}