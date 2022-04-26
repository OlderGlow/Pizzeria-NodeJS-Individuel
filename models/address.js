import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'

export const Address = connectionDatabase().define('addresses', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  id_user: {
    allowNull: false,
    type: Sequelize.INTEGER,
    field: 'id_user',
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  zipCode: {
    type: Sequelize.INTEGER(5),
    allowNull: false,
    field: 'zipCode'
  },
  street: {
    type: Sequelize.STRING(200),
    allowNull: false,
    field: 'street'
  },
  city: {
    type: Sequelize.STRING(50),
    allowNull: false,
    field: 'city'
  }
}, {
  tableName: 'Addresses',
  timestamps: false
})
