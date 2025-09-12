import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import Database from "better-sqlite3";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  development: {
    dialect: "postgres",
    storage: path.join(__dirname, ".", "storage", "development.sqlite"),
    dialectOptions: { ssl: false },
    logging: console.log,
  },
  test: {
    dialect: "postgres",
    storage: path.join(__dirname, ".", "storage", "test.sqlite"),
    dialectOptions: { ssl: false },
    logging: console.log,
  },
  production: {
    dialect: "postgres",
    storage: "./database.sqlite",
    dialectOptions: { ssl: false },
    logging: console.log,
  },
};

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

export default dbConfig;
