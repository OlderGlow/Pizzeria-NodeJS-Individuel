import { addBoissons, deleteBoisson, editBoisson, editBoissonView, getBoissons } from '../services/boissonServices.js'

export const Boisson = (app) => {
  app.get('/admin/boissons', (req, res) => {
    getBoissons().then(boissons => {
      res.render('admin/boissons/home', { boissons, active: 'boissons-home', error: false })
    })
  })
  app.get('/admin/boissons/add', (req, res) => {
    res.render('admin/boissons/add', { active: 'boissons-home', error: false })
  })
  app.post('/admin/boissons/add', async (req, res) => {
    const boisson = await addBoissons(req, res)
    if(boisson) {
      res.redirect('/admin/boissons')
    }
  })
  app.get('/admin/boissons/edit', async (req, res) => {
    const boisson = await editBoissonView(req, res)
    await res.render('admin/boissons/edit', { boisson, active: 'boissons-home', error: false })
  })
  app.post('/admin/boissons/edit', async (req, res) => {
    const boisson = await editBoisson(req, res)
    if(boisson) {
      res.redirect('/admin/boissons')
    }
  })
  app.delete('/admin/boissons/delete', async (req, res) => {
    const boisson = await deleteBoisson(req, res)
    if(boisson) {
      res.redirect('/admin/boissons')
    }
  })
}