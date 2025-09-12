import dbConfig from "../database/config.js";

import AuthFactory from "./auth.model.js";
import PlayerFactory from "./player.model.js";
import PlayerAttributesFactory from "./playerAttributes.model.js";
import RefreshTokenFactory from "./refreshToken.model.js";
import ReportFactory from "./report.model.js";
import ScoutFactory from "./scout.model.js";

import { Sequelize, DataTypes } from "sequelize";
import { seedDatabase } from "../database/seeders/index.js";

const sequelize = new Sequelize({
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

const Auth = AuthFactory(sequelize, DataTypes);
const RefreshToken = RefreshTokenFactory(sequelize, DataTypes);
const Scout = ScoutFactory(sequelize, DataTypes);
const Player = PlayerFactory(sequelize, DataTypes);
const Report = ReportFactory(sequelize, DataTypes);
const PlayerAttributes = PlayerAttributesFactory(sequelize, DataTypes);

console.log("😒Modelos creados:", sequelize.models);
const models = sequelize.models;

Object.values(models).forEach((model) => models[model.name].associate(models));

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a SQLite establecida correctamente");

    const tablesExists = await sequelize.getQueryInterface().showAllTables();
    console.log("Tables exists?: ", tablesExists);

    if (tablesExists.length === 0) {
      await sequelize.sync({
        force: false,
        alter: process.env.NODE_ENV !== "production",
      });
      console.log("Modelos y asociaciones sincronizados correctamente");
      //Seedear
      const tables = await sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table'"
      );
      console.log("Tablas existentes:", tables);
      await seedDatabase(sequelize.models);
    }

    console.log("Modelos sincronizados con la base de datos");
  } catch (error) {
    console.log("Error conectando base de datos: ", error);
    process.exit(1);
  }
};
export {
  sequelize,
  Auth,
  Scout,
  Report,
  Player,
  PlayerAttributes,
  RefreshToken,
};
