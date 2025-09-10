import { sequelize } from "../database/connectionSqlite.database.js";
import { DataTypes } from "sequelize";

const Auth = sequelize.define("Auth", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  timestamps: true,
});

export default Auth;
