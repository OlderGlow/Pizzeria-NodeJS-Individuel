import { Sequelize } from 'sequelize'

import dotenv from 'dotenv'

dotenv.config({ path: `./.env.local` })

export const connectionDatabase = () => {

  return new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  })
}