import pkg from "pg";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isCloudRun = process.env.K_SERVICE !== undefined;
const usingProxy = isCloudRun || process.env.DB_HOST === "localhost";

const useSSL = process.env.NODE_ENV === "production" && !usingProxy;
console.log("Usando SSL:", useSSL);

let sslConfig = null;
let certPath = "";

if (useSSL) {
  try {
    certPath = path.join(__dirname, "../certs/server-ca.pem");

    if (!fs.existsSync(certPath)) {
      throw new Error(`Certificado no encontrado en: ${certPath}`);
    }

    const caCert = fs.readFileSync(certPath, "utf8");

    sslConfig = {
      ca: caCert,
      rejectUnauthorized: true,
    };

    console.log(" Certificado ");
  } catch (error) {
    console.error(" Error", error.message);
    process.exit(1);
  }
}

export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: false,
  connectionTimeoutMillis: 20000,
});

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    dialectModule: pkg,
    dialectOptions: {
      ssl: false,
    },

    pool: {
      max: 3,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
    retry: {
      max: 5,
      timeout: 10000,
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a DB establecida correctamente");
  } catch (error) {
    console.error("❌ Error de conexión a DB:", error);
    process.exit(1);
  }
})();
