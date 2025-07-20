import pkg from "pg";
import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const { Pool } = pkg;

console.log(process.env.DB_PORT);

export const db = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: false,
});

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectModule: pkg,
    dialectOptions: {
      ssl: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
  }
);




