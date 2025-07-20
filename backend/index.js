import e from "express";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import { db } from "./database/connection.database.js";
import { sequelize } from "./database/connection.database.js";

import authRouter from "./routes/auth.router.js";
import playersRouter from "./routes/players.router.js"; 
import reportsRouter from "./routes/reports.router.js";
//import dashboardRouter from "./routes/dashboard.router.js";
import { accessTokenMiddleware } from "./middlewares/accessToken.middleware.js";

config();

const app = e();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(e.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Authorization"],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/players", playersRouter);
app.use("/api/reports", accessTokenMiddleware, reportsRouter);
//app.use("/api/dashboard", accessTokenMiddleware, dashboardRouter);

const startServer = async () => {
  try {
    db.query("SELECT NOW()", (err) => {
      if (err) {
        console.log("ERROR CONNECTING DATABASE", err);
      } else {
        console.log(" DATABASE CONNECTION SUCCESS!");
      }
    });

    await sequelize.authenticate();
    console.log("DB SEQUEL SUCCESSFULLY CONNECTED");

    // if (process.env.NODE_ENV !== "production") {
    //   await sequelize.sync({ alter: true });
    //   console.log("Sync models");
    // }

    app.listen(process.env.PORT, () => {
      console.log("Server listeningn on :", process.env.PORT);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
    process.exit(1);
  }
};

startServer();
