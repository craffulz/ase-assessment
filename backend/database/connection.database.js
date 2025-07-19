import pkg from "pg";
import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const { Pool } = pkg;

console.log(process.env.DB_PORT);

const db = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: false,
});

const sequelize = new Sequelize(
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

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize: Conexión a DB establecida correctamente");
  } catch (error) {
    console.error("Sequelize: Error al conectar a la DB:", error);
  }
})();

db.query("SELECT NOW()", (err) => {
  if (err) {
    console.log("ERROR CONNECTING DATABASE", err);
  } else {
    console.log(" DATABASE CONNECTION SUCCESS!");
  }
});

export default { db, sequelize };
