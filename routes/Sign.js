import {
  deleteUser,
  editStatusUser,
  editUser,
  getAllUsers,
  login,
  register,
  showOneUser
} from '../services/userServices.js'
import { getUserIsAdmin, verifyToken } from '../helpers/_jwt.js'

export const Sign = (app) => {
  app.get('/login', (req, res) => {
    if(!req.cookies.accesstoken) {
      res.render('login', { error: false, active: 'login' })
    } else {
      res.redirect('/admin/users');
    }
  });

  app.get('/logout', (req, res) => {
    res.clearCookie('accesstoken');
    res.redirect('/login');
  });

  app.post('/login', (req, res) => {
      login(req, res);
  });

  app.get('/register', (req, res) => {
    if(!req.cookies.accesstoken) {
      res.render('register', { error: false, active: 'login' });
    } else {
      res.redirect('/admin/users');
    }
  });

  app.post('/register', (req, res) => {
    register(req, res, true);
  });
}
export const Home = (app) => {
  app.get('/admin/users', (req, res) => {
    if(req.cookies.accesstoken) {
      getAllUsers(req, res);
    } else {
      res.redirect('/login');
    }
  });

  app.get('/admin/users/add', (req, res) => {
    if(req.cookies.accesstoken) {
      res.render('admin/users/add', { error: false, active: 'users-home' });
    } else {
      res.redirect('/login');
    }
  });

  app.post('/admin/users/add', (req, res) => {
    register(req, res, true);
  });

  app.delete('/admin/users/delete', (req, res) => {
    if(req.cookies.accesstoken) {
      deleteUser(req, res);
    } else {
      res.redirect('/login');
    }
  });

  app.get('/admin/users/edit', (req, res) => {
    if(req.cookies.accesstoken) {
      showOneUser(req, res);
    } else {
      res.redirect('/login');
    }
  });

  app.post('/admin/users/edit', (req, res) => {
    if(req.cookies.accesstoken) {
      editUser(req, res, true);
    } else {
      res.redirect('/login');
    }
  });

  app.post('/admin/users/edit/status', (req, res) => {
    if(req.cookies.accesstoken) {
      editStatusUser(req, res);
    } else {
      res.redirect('/login');
    }
  });
}