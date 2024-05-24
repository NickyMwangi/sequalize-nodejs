'use strict';
import { DataTypes, Sequelize } from 'sequelize';
import { sequalize } from "../../config/database.js";
import bcrypt from 'bcrypt'


export default sequalize.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0', '1', '2')
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.BIGINT
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if (value === this.password) {
        const hashedPwd = bcrypt.hashSync(value, 10);
        console.log(hashedPwd)
        this.setDataValue('password', hashedPwd);
      }
      else {
        throw new Error('Password and confirm password MUST be the same')
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}, {
  paranoid: true, // allows soft delete. Ensure you have deletedAt
  freezeTableName: true,
  modelName: 'users'
})