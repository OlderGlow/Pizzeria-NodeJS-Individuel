import { Promotion } from '../models/promotion.js'

export const getPromotions = async () => {
  return await Promotion.findAll()
}
export const addPromotions = async (req, res) => {
  const { name, description, discount, start_date, end_date } = req.body
  if (!name || !description || !discount || !start_date || !end_date) {
    res.render('admin/promotions/add', {
      error: 'Merci de remplir tous les champs',
      active: 'promotions-home'
    })
  } else if (discount > 100) {
    res.render('admin/promotions/add', {
      error: 'Le pourcentage de réduction ne peut pas être supérieur à 100%',
      active: 'promotions-home'
    })
  } else if (start_date > end_date) {
    res.render('admin/promotions/add', {
      error: 'La date de début ne peut pas être supérieur à la date de fin',
      active: 'promotions-home'
    })
  } else if (start_date < new Date()) {
    res.render('admin/promotions/add', {
      error: 'La date de début ne peut pas être inférieur à la date actuelle',
      active: 'promotions-home'
    })
  } else {
    return await Promotion.create({
      name,
      description,
      discount,
      start_date,
      end_date,
      status: true
    })
  }
}
export const getOnePromotion = async (req, res) => {
  return await Promotion.findOne({
    where: {
      id: req.query.id
    }
  })
}
export const editPromotion = async (req, res) => {
  const { name, description, discount, start_date, end_date } = req.body
  const promotion = getPromotions()
  if (!name || !description || !discount || !start_date || !end_date) {
    return res.render('admin/promotions/edit', {
      error: 'Merci de remplir tous les champs',
      active: 'promotions-home',
      promotions: promotion
    })
  } else if (discount > 100) {
    return res.render('admin/promotions/edit', {
      error: 'Le pourcentage de réduction ne peut pas être supérieur à 100%',
      active: 'promotions-home',
      promotions: promotion
    })
  } else if (start_date > end_date) {
    return res.render('admin/promotions/edit', {
      error: 'La date de début ne peut pas être supérieur à la date de fin',
      active: 'promotions-home',
      promotions: promotion
    })
  } else if (start_date < new Date()) {
    return res.render('admin/promotions/edit', {
      error: 'La date de début ne peut pas être inférieur à la date actuelle',
      active: 'promotions-home',
      promotions: promotion
    })
  } else {
     await Promotion.update(
      {
        name,
        description,
        discount,
        start_date,
        end_date
      },
      {
        where: {
          id: req.query.id
        }
      }
    )
    await res.redirect('/admin/promotions')
  }
}

export const deletePromotion = async (req, res) => {
  return await Promotion.destroy({
    where: {
      id: req.query.id
    }
  })
}