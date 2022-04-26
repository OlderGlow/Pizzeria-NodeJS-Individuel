import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'

export const Promotion = connectionDatabase().define('promotions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  discount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN(true),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Promotions'
})