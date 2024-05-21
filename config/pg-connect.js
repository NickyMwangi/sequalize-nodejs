import { Sequelize } from 'sequelize';
import { config } from './config.js'
const env = process.env.NODE_ENV || 'development'


export const sequalize = new Sequelize(config[env])

try {
  await sequalize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}