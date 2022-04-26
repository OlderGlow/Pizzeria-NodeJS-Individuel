import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'

export const Dessert = connectionDatabase().define('desserts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Desserts'
})

await Dessert.sync()