import {
  editUser,
  addUser,
  getAllUsers,
  editStatusUser,
  deleteUser,
  showOneUser,
  editAddress,
  getAddresses
} from '../services/clientServices.js'


export const Client = (app) => {
  app.get('/admin/clients', (req, res) => {
    if (req.cookies.accesstoken) {
      getAllUsers(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/clients/add', (req, res) => {
    if (req.cookies.accesstoken) {
      res.render('admin/clients/add', { error: false, active: 'clients-home' })
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/clients/add', (req, res) => {
    addUser(req, res)
  })
  app.delete('/admin/clients/delete', (req, res) => {
    if (req.cookies.accesstoken) {
      deleteUser(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/clients/edit', (req, res) => {
    if (req.cookies.accesstoken) {
      showOneUser(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/clients/edit', (req, res) => {
    if (req.cookies.accesstoken) {
      editUser(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/clients/edit/status', (req, res) => {
    if (req.cookies.accesstoken) {
      editStatusUser(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.post('/admin/clients/address', (req, res) => {
    if (req.cookies.accesstoken) {
      editAddress(req, res)
    } else {
      res.redirect('/login')
    }
  })
  app.get('/admin/clients/address', (req, res) => {
    if (req.cookies.accesstoken) {
      getAddresses(req, res)
    } else {
      res.status(401).json({ error: 'Vous n\'êtes pas autorisé à accéder à cette page' })
    }
  })
}