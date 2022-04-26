import { User } from '../models/user.js'
import { generateToken } from '../helpers/_jwt.js'
import bcrypt from 'bcrypt'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,50}$/

export const login = (req, res) => {

  const { email, password } = req.body

  if (email == null || password == null) {
    return res.status(400).json({ 'error': 'missing parameters' })
  }

  User.findOne({ where: { email } }).then(user => {
    if (!user) {
      res.render('login', { error: 'L\'email ou le mot de passe est incorrect.', active: 'login' })
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return console.log('error while comparing password')
        }
        if (isMatch) {
          generateToken(user).then(token => {
            res.cookie('accesstoken', token)
            res.redirect('/admin/users')
          })
        } else {
          res.render('login', { error: 'L\'email ou le mot de passe est incorrect.', active: 'login' })
        }
      })
    }
  })
}
export const register = (req, res, isAdmin) => {

  const { email, password, firstName, lastName, passwordConfirmation } = req.body

  if (!email || !password || !firstName || !lastName || !passwordConfirmation) {
    return res.render('register', { error: 'Tous les champs n\'ont pas été remplis', active: 'login' })
  }

  if (password !== passwordConfirmation) {
    return res.render('register', { error: 'Les mots de passe ne correspondent pas', active: 'login' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.render('register', { error: 'L\'email n\'est pas valide', active: 'login' })
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.render('register', { error: 'Le mot de passe doit comprendre plus de 4 caractères et un chiffre minimum', active: 'login' })
  }

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      res.render('register', { error: 'L\'email est déjà utilisé', active: 'login' })
    } else {

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return console.log('error while hashing password')
        }
        User.create({
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: hash,
          isAdmin: isAdmin,
          isActive: true,
          isDelivery: false
        }).then(user => {
          generateToken(user.dataValues).then(token => {
            res.cookie('accesstoken', token)
            res.redirect('/admin/users')
          })
        })
      })
    }
  })
}
export const getAllUsers = (req, res) => {
  User.findAll({where: {isAdmin: true}}).then(users => {
    res.render('admin/users/home', { users, active: 'users-home'})
  })
}
export const deleteUser = (req, res) => {
  const { id } = req.query
  User.destroy({ where: { id } }).then(() => {
    res.redirect('/admin/users')
  })
}
export const showOneUser = (req, res) => {
  const { id } = req.query
  User.findOne({ where: { id } }).then(user => {
    res.render('admin/users/edit', { user, error: false, active: 'users-home' })
  })
}
export const editUser = (req, res, isAdmin) => {
  const { id } = req.query

  const { email, password, firstName, lastName, passwordConfirmation } = req.body

  if (!email || !password || !firstName || !lastName || !passwordConfirmation) {
    return res.render('admin/users/edit', { error: 'Tous les champs n\'ont pas été remplis', active: 'users-home' })
  }

  if (password !== passwordConfirmation) {
    return res.render('admin/users/edit', { error: 'Les mots de passe ne correspondent pas', active: 'users-home' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.render('admin/users/edit', { error: 'L\'email n\'est pas valide', active: 'users-home' })
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.render('admin/users/edit', { error: 'Le mot de passe doit comprendre plus de 4 caractères et un chiffre minimum', active: 'users-home' })
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return console.log('error while hashing password')
    }
    User.update({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hash,
      isAdmin: isAdmin,
      isActive: true,
      isDelivery: false
    }, {
      where: { id }
    }).then(() => {
      res.redirect('/admin/users')
    })
  })
}
export const editStatusUser = (req, res) => {
  const { id } = req.query

  User.update({
    isActive: !(JSON.parse(req.body.status))
  }, {
    where: { id }
  }).then(() => {
    res.redirect('/admin/users')
  })
}