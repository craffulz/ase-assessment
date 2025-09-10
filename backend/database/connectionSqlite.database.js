import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import configureAssociations from "../models/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  development: {
    dialect: "sqlite",
    storage: path.join(__dirname, ".", "storage", "development.sqlite"),
    logging: console.log,
  },
  test: {
    dialect: "sqlite",
    storage: path.join(__dirname, ".", "storage", "test.sqlite"),
  },
  production: {
    dialect: "sqlite",
    storage: path.join(__dirname, ".", "storage", "production.sqlite"),
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
export const syncModels = async () => {
  try {
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log("Tablas existentes: ", tables);
    if (tables.length === 0) {
      configureAssociations();
      await sequelize.sync({
        force: false,
        alter: process.env.NODE_ENV !== "production",
      });
      console.log("Modelos y asociaciones sincronizados correctamente");
      // await seedDatabase();
      // console.log("Database seeded! 🌱");
    }
  } catch (error) {
    console.log("Error sincronizando modelos", error);
    throw error;
  }
};

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a SQLite establecida correctamente");

    const tablesExists = await sequelize.getQueryInterface().showAllTables();
    console.log("Tables exists?: ", tablesExists);
    if (tablesExists === 0)
      await sequelize.sync({
        force: true,
        alter: process.env.NODE_ENV !== "production",
      });

    console.log("Modelos sincronizados con la base de datos");
  } catch (error) {
    console.log("Error conectando base de datos: ", error);
    process.exit(1);
  }
};
