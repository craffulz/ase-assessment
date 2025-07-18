import pkg from "pg";
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

//check connection

db.query("SELECT NOW()", (err) => {
  if (err) {
    console.log("ERROR CONNECTING DATABASE", err);
  } else {
    console.log(" DATABASE CONNECTION SUCCESS!");
  }
});

export default db;
