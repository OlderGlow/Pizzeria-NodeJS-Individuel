import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'
import { Ingredients } from './ingredients.js'
export const Pizza = connectionDatabase().define('pizzas', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING(30),
    field: 'name',
    allowNull: false
  },
  code: {
    type: Sequelize.INTEGER(50),
    field: 'code',
    allowNull: false
  },
  category: {
    type: Sequelize.STRING(20),
    field: 'category',
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    field: 'price',
    allowNull: false
  },
  version_pizza: {
    type: Sequelize.INTEGER(10),
    field: 'version_pizza',
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN(1),
    field: 'isActive',
    allowNull: false
  }
}, {
  tableName: 'Pizzas',
  timestamps: true
})

await Pizza.sync({ force: false });
export const IngredientsPizzas = connectionDatabase().define('Ingredients_Pizzas', {
  quantite: Sequelize.INTEGER(5)
}, {
  tableName: 'Ingredients_Pizzas',
  timestamps: false
})

await Ingredients.belongsToMany(Pizza, { through: IngredientsPizzas })
await Pizza.belongsToMany(Ingredients, { through: IngredientsPizzas })

await Ingredients.sync({ force: false });
await IngredientsPizzas.sync({ force: false });
