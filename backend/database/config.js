import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  development: {
    dialect: "sqlite",
    storage: path.join(__dirname, ".", "storage", "development.sqlite"),
    dialectOptions: { ssl: false },
    logging: console.log,
  },
  test: {
    dialect: "sqlite",
    storage: path.join(__dirname, ".", "storage", "test.sqlite"),
    dialectOptions: { ssl: false },
    logging: console.log,
  },
  production: {
    dialect: "postgres",
    dialectOptions: { ssl: false },
    logging: console.log,
  },
};

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

export default dbConfig;
