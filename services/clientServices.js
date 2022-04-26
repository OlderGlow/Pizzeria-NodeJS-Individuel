import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import { Address } from '../models/address.js'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,20}$/

export const addUser = (req, res) => {

  const { email, password, firstName, lastName, passwordConfirmation, city, street, zipCode } = req.body

  if (!email || !password || !firstName || !lastName || !passwordConfirmation || !city || !street || !zipCode) {
    return res.render('register', { error: 'Tous les champs n\'ont pas été remplis', active: 'clients-home' })
  }

  if (password !== passwordConfirmation) {
    return res.render('register', { error: 'Les mots de passe ne correspondent pas', active: 'clients-home' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.render('register', { error: 'L\'email n\'est pas valide', active: 'clients-home' })
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.render('register', {
      error: 'Le mot de passe doit comprendre plus de 4 caractères et un chiffre minimum',
      active: 'clients-home'
    })
  }
  let addresses = []

  if (!Array.isArray(street)) {
    addresses.push({
      street: street,
      city: city,
      zipCode: zipCode,
    })
  } else {
    for(let i=0; i<street.length; i++){
      addresses.push({
        street: street[i],
        city: city[i],
        zipCode: zipCode[i],
      })
    }
  }

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      res.render('register', { error: 'L\'email est déjà utilisé', active: 'clients-home' })
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
          isAdmin: false,
          isActive: true,
          addresses: addresses
        }, {
          include: Address
        }).then(() => {
          res.redirect('/admin/clients')
        })
      })
    }
  })
}
export const getAllUsers = (req, res) => {

  User.findAll({ include: Address, where: { isAdmin: false } }).then(users => {
    res.render('admin/clients/home', { users, active: 'clients-home' })
  })

}
export const deleteUser = (req, res) => {
  const { id } = req.query
  User.destroy({ where: { id } }).then(() => {
    res.redirect('/admin/clients')
  })
}
export const showOneUser = (req, res) => {
  const { id } = req.query
  User.findOne({ include: Address, where: { id } }).then(user => {
    res.render('admin/clients/edit', { user, error: false, active: 'clients-home' })
  })
}
export const editUser = (req, res) => {
  const { id } = req.query

  const { email, password, firstName, lastName, passwordConfirmation, address, city, zipCode } = req.body

  if (!email || !password || !firstName || !lastName || !passwordConfirmation) {
    return res.render('admin/clients/edit', { error: 'Tous les champs n\'ont pas été remplis', active: 'clients-home' })
  }

  if (password !== passwordConfirmation) {
    return res.render('admin/clients/edit', { error: 'Les mots de passe ne correspondent pas', active: 'clients-home' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.render('admin/clients/edit', { error: 'L\'email n\'est pas valide', active: 'clients-home' })
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.render('admin/clients/edit', {
      error: 'Le mot de passe doit comprendre plus de 4 caractères et un chiffre minimum',
      active: 'clients-home'
    })
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
      isAdmin: false,
      isActive: true,
    }, {
      where: { id }
    })
      .then(() => {
        res.redirect('/admin/clients')
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
    res.redirect('/admin/clients')
  })
}
export const editAddress = (req, res) => {
  const { id } = req.query
  Address.update({
    street: req.body.street,
    city: req.body.city,
    zipCode: req.body.zipCode
  }, {
    where: { id }
  }).then(() => {
    res.redirect('admin/clients/edit?id=' + id)
  })
}
export const getAddresses = (req, res) => {
  const { id } = req.query
  User.findOne({ include: Address, where: { id } }).then(user => {
    res.json(user.addresses)
  })
}