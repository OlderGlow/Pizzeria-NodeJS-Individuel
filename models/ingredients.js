import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'

export const Ingredients = connectionDatabase().define('ingredients', {
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
  qteStock: {
    type: Sequelize.INTEGER(11),
    field: 'qteStock',
    allowNull: true
  }
}, {
  tableName: 'Ingredients',
  timestamps: false
})


