import { connectionDatabase } from '../helpers/_db.js'
import { Sequelize } from 'sequelize'
import { Address } from './address.js'
import { Commande } from './commande.js'
import { Livreur } from './livreur.js'
import { Pizza } from './pizza.js'
import { Promotion } from './promotion.js'

export const User = connectionDatabase().define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstname: {
    type: Sequelize.STRING(30),
    field: 'firstname',
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING(30),
    field: 'lastname',
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(200),
    field: 'email',
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(255),
    field: 'password',
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN(false),
    field: 'isAdmin',
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN(true),
    field: 'isActive',
    allowNull: false,
  }
}, {
  tableName: 'Users',
  timestamps: true
})

await User.hasMany(Address, {
  foreignKey: {
    name: 'id_user'
  },
  onDelete: 'CASCADE'
})

await User.hasMany(Commande, { onDelete: 'cascade', as: "Commande" })
await Livreur.hasMany(Commande, { onDelete: 'cascade', as: "Commande" })
await Promotion.hasMany(Commande, {as: "Commande"})
await Commande.belongsTo(User, { foreignKey: { name: 'userId' } })
await Commande.belongsTo(Livreur, { foreignKey: { name: 'livreurId' } })
await Commande.belongsTo(Address, { foreignKey: { name: 'addressId' } })
await Commande.belongsTo(Promotion, { foreignKey: { name: 'promotionId' } })

await User.sync({ force: false })
await Address.sync({ force: false });
await Promotion.sync({ force: false });
await Commande.sync({ force: false });

export const CommandePizza = connectionDatabase().define('Commandes_Pizzas', {
  quantite: Sequelize.INTEGER(5)
});

await Commande.belongsToMany(Pizza, { through: CommandePizza })
await Pizza.belongsToMany(Commande, { through: CommandePizza })
await CommandePizza.sync()

