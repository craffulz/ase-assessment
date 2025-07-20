import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.database.js";

const Player = sequelize.define(
  "Player",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    team: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goals: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    assists: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    appearances: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    contract_salary: {
      type: DataTypes.INTEGER,
    },
    contract_end: {
      type: DataTypes.DATEONLY,
    },
    market_value: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "players",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

    indexes: [
      { fields: ["position"], name: "idx_players_position" },
      { fields: ["team"], name: "idx_players_team" },
      { fields: ["age"], name: "idx_players_age" },
      { fields: ["nationality"], name: "idx_players_nationality" },
      { fields: ["contract_end"], name: "idx_players_contract_end" },
      { fields: ["market_value"], name: "idx_players_market_value" },
      { fields: ["team", "position"], name: "idx_players_team_position" },
    ],
  }
);

export default Player;
