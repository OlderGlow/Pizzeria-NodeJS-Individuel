import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'
export const Livreur = connectionDatabase().define('livreurs', {
    id: {
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    lastName: {
      type: Sequelize.STRING(50),
      field: 'lastName',
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING(50),
      field: 'firstName',
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(255),
      field: 'email',
      allowNull: false,
      unique: true
    },
  }, {
    tableName: 'Livreurs',
    timestamps: false
  })

await Livreur.sync({ force: false });
