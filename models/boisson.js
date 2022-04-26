import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'

export const Boisson = connectionDatabase().define('boissons', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nom: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  prix: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Boissons'
});

await Boisson.sync({ force: false });