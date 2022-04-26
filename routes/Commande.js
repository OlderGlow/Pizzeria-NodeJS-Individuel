import {
  deleteCommande,
  getAllCommandes,
  showAddCommande,
  addCommande,
  getOneCommande, editOneCommande, getCommandeApi
} from '../services/commandeServices.js'

export const Commande = (app, io) => {
  app.get('/admin/commandes', (req, res) => {
    if(req.cookies.accesstoken){
      getAllCommandes(req, res).then((commandes) => {
        res.render('admin/commandes/home', {
          commandes: commandes,
          active: 'commandes-home',
          error: false
        })
      })
    }
  })
  app.delete('/admin/commandes/delete', (req, res) => {
    if (req.cookies.accesstoken) {
      deleteCommande(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/commandes/add', (req, res) => {
    if (req.cookies.accesstoken) {
      showAddCommande(req, res).then(r => console.log('commande affichée'))
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/commandes/add', async (req, res) => {
    if (req.cookies.accesstoken) {
      const data = await addCommande(req, res)
      if(data){
        await io.emit('newOrder', {
          message: 'Nouvelle commande enregistrée',
          data: data.id
        })
        await res.redirect('/admin/commandes')
      }
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/commandes/edit', (req, res) => {
    if (req.cookies.accesstoken) {
      getOneCommande(req, res).then(() => console.log('commande récupérée'))
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/commandes/edit', (req, res) => {
    if (req.cookies.accesstoken) {
      editOneCommande(req, res, io).then(() => console.log('commande éditée'))
    } else {
      res.redirect('/login')
    }
  })
  app.get('/api/commandes', (req, res) => {
    if (req.cookies.accesstoken) {
      getCommandeApi(req, res).then((commandes) => {
        res.json(commandes)
      })
    } else {
      res.json({
        error: 'Vous n\'avez pas accès à cette ressource'
      })
    }
  })
}