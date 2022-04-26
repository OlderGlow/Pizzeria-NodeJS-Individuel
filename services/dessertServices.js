import { Dessert } from '../models/dessert.js'

export const getAllDesserts = async (req, res) => {
  return await Dessert.findAll();
}
export const addDessert = async (req, res) => {
  const { name, price } = req.body;
  if(!name || !price) {
    return res.render('admin/desserts/add', {
      error: 'Merci de remplir tous les champs',
      active: 'desserts-home'
    });
  }
  return await Dessert.create({
    name,
    price
  });
}
export const getOneDessert = async (req, res) => {
  const { id } = req.query;
  return await Dessert.findOne({
    where: {
      id
    }
  });
}
export const editDessert = async (req, res) => {
  const { id } = req.query;
  const { name, price } = req.body;
  if(!name || !price) {
    return res.render('admin/desserts/edit', {
      error: 'Merci de remplir tous les champs',
      active: 'desserts-home',
      dessert: await Dessert.findOne({
        where: {
          id
        }
      })
    });
  }
  return await Dessert.update({
    name,
    price
  }, {
    where: {
      id
    }
  });
}
export const deleteDessert = async (req, res) => {
  const { id } = req.query;
  return await Dessert.destroy({
    where: {
      id
    }
  });
}