import { addLivreur, deleteLivreur, editLivreur, getAllLivreurs, showOneLivreur } from '../services/liveurServices.js'

export const Livreur = (app) => {
  app.get('/admin/livreurs', (req, res) => {
    if (req.cookies.accesstoken) {
      getAllLivreurs(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/livreurs/add', (req, res) => {
    if (req.cookies.accesstoken) {
      res.render('admin/livreurs/add', { error: false, active: 'livreurs-home' })
    } else {
      res.redirect('/login')
    }
  })

  app.post('/admin/livreurs/add', (req, res) => {
    addLivreur(req, res)
  })

  app.delete('/admin/livreurs/delete', (req, res) => {
    if (req.cookies.accesstoken) {
      deleteLivreur(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/livreurs/edit', (req, res) => {
    if (req.cookies.accesstoken) {
      showOneLivreur(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/livreurs/edit', (req, res) => {
    if (req.cookies.accesstoken) {
      editLivreur(req, res)
    } else {
      res.redirect('/login')
    }
  })

}