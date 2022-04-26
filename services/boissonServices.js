import { Boisson } from '../models/boisson.js'

export const getBoissons = async (req, res) => {
  return await Boisson.findAll()
}
export const addBoissons = async (req, res) => {
  const { nom, prix } = req.body
  if (!nom || !prix) {
    return res.render('admin/boissons/add', {
      error: 'Veuillez remplir tous les champs',
      active: 'boissons-home'
    })
  } else {
    return await Boisson.create({
      nom,
      prix
    })
  }
}
export const editBoissonView = async (req, res) => {
  const { id } = req.query
  return await Boisson.findOne({
    where: {
      id
    }
  })
}
export const editBoisson = async (req, res) => {
  const { id } = req.query
  const { nom, prix } = req.body
  if (!nom || !prix) {
    return res.render('admin/boissons/edit', {
      error: 'Veuillez remplir tous les champs',
      boisson: {
        id,
        nom,
        prix
      },
      active: 'boissons-home'
    })
  } else {
    return await Boisson.update({
      nom,
      prix
    }, {
      where: {
        id
      }
    })
  }
}
export const deleteBoisson = async (req, res) => {
  const { id } = req.query
  return await Boisson.destroy({
    where: {
      id
    }
  })
}