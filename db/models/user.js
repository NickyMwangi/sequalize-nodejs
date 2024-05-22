'use strict';
import { Sequelize } from 'sequelize';
import { sequalize } from "../../config/database.js";


export default sequalize.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: {
    type: Sequelize.ENUM
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.BIGINT
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE
  }
}, {
  paranoid: true, // allows soft delete. Ensure you have deletedAt
  freezeTableName: true,
  modelName: 'users'
})