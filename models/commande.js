import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'

export const Commande = connectionDatabase().define('commandes', {
  id: {
    field: 'id',
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  status: {
    field: 'status',
    type: Sequelize.STRING,
    allowNull: true
  },
  prixTotal: {
    type: Sequelize.FLOAT,
    field: 'price',
    allowNull: false
  }
}, {
  tableName: 'Commandes',
  timestamps: false
})
