import { Sequelize } from ".";
import { sequalize } from "../../config/pg-connect.js";

export const userModel = sequalize.define('product', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})