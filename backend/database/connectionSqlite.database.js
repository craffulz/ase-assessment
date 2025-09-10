import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  development: {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "storage", "development.sqlite"),
    logging: console.log,
  },
  test: {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "storage", "test.sqlite"),
  },
  production: {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "storage", "production.sqlite"),
    logging: false,
  },
};

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

export const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  logging: dbConfig.logging,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a SQLite establecida correctamente");

    await sequelize.sync({ force: false, alter: env !== "production" });
    console.log("Modelos sincronizados con la base de datos");
  } catch (error) {
    console.log("Error conectando base de datos: ", error);
    process.exit(1);
  }
};
