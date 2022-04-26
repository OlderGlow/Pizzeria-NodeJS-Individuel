import {
  addPromotions,
  deletePromotion,
  editPromotion,
  getOnePromotion,
  getPromotions
} from '../services/promotionServices.js'

export const Promotion = (app) => {
  app.get('/admin/promotions', (req, res) => {
    getPromotions().then((promotions) => {
      res.render('admin/promotions/home', {
        promotions: promotions,
        error: false,
        active: 'promotions-home'
      })
    })
  })

  app.get('/admin/promotions/add', (req, res) => {
    res.render('admin/promotions/add', {
      error: false,
      active: 'promotions-add'
    })
  })

  app.post('/admin/promotions/add', async (req, res) => {
    await addPromotions(req, res)
    await res.redirect('/admin/promotions')
  })

  app.get('/admin/promotions/edit', (req, res) => {
    getOnePromotion(req, res).then((promotion) => {
      res.render('admin/promotions/edit', {
        promotion: promotion,
        error: false,
        active: 'promotions-home'
      })
    })
  })
  app.post('/admin/promotions/edit', (req, res) => {
    editPromotion(req, res).then(() => {
      res.redirect('/admin/promotions')
    })
  })
  app.delete('/admin/promotions/delete', (req, res) => {
    deletePromotion(req, res).then(() => {
      res.redirect('/admin/promotions')
    })
  })
}