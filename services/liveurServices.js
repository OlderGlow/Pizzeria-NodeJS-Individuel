import { Livreur } from '../models/livreur.js'
import bcrypt from 'bcrypt'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const addLivreur = (req, res) => {

  const { email, firstName, lastName } = req.body

  if (!email || !firstName || !lastName) {
    return res.render('register', { error: 'Tous les champs n\'ont pas été remplis', active: 'livreurs-home' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.render('register', { error: 'L\'email n\'est pas valide', active: 'livreurs-home' })
  }

  Livreur.findOne({ where: { email } }).then(livreur => {
      if (livreur) {
        res.render('admin/livreurs', { error: 'L\'email est déjà utilisé', active: 'livreurs-home' })
      } else {
        Livreur.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
        }).then(() => {
          res.redirect('/admin/livreurs')
        })
      }
    }
  )
}
export const getAllLivreurs = (req, res) => {

  Livreur.findAll().then(livreurs => {
    res.render('admin/livreurs/home', { livreurs, active: 'livreurs-home' })
  })

}
export const deleteLivreur = (req, res) => {
  const { id } = req.query
  Livreur.destroy({ where: { id } }).then(() => {
    res.redirect('/admin/livreurs')
  })
}
export const showOneLivreur = (req, res) => {
  const { id } = req.query
  Livreur.findOne({ where: { id } }).then(livreur => {
    res.render('admin/livreurs/edit', { livreur, error: false, active: 'livreurs-home' })
  })
}
export const editLivreur = (req, res) => {
  const { id } = req.query
  const { email, firstName, lastName } = req.body
  if (!email || !firstName || !lastName) {
    return res.render('admin/livreurs/edit', {
      error: 'Tous les champs n\'ont pas été remplis',
      active: 'livreurs-home'
    })
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.render('admin/livreurs/edit', { error: 'L\'email n\'est pas valide', active: 'livreurs-home' })
  }
  Livreur.update({
    firstName: firstName,
    lastName: lastName,
    email: email
  }, {
    where: { id }
  })
    .then(() => {
      res.redirect('/admin/livreurs')
    })

}
