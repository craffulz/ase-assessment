import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

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
import playerAttributesRouter from "./routes/playerAttributes.router.js";
import { accessTokenMiddleware } from "./middlewares/accessToken.middleware.js";

config();

console.log(process.env.DB_HOST);

const app = e();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ASE Athletics API",
      version: "1.0.0",
      description: "ASE Football Metrica API Documentation",
    },
  },
  apis: ["./routes/*.js"], // aquí defines dónde pones tus rutas con comentarios swagger
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", accessTokenMiddleware, swaggerUi.serve, swaggerUi.setup(specs));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(e.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["https://ase-assessment.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "¡Backend funcionando correctamente!",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/players", playersRouter);
app.use("/api/reports", accessTokenMiddleware, reportsRouter);
app.use("/api/playerAttributes", accessTokenMiddleware, playerAttributesRouter);

app.use((err, req, res, next) => {
  console.error("❌ Error global:", err.stack);
  res.status(500).json({ error: "Algo salió mal" });
});

app.listen(process.env.PORT, async () => {
  console.log("Server listening on port:", process.env.PORT);

  try {
    await sequelize.authenticate();
    console.log("Conexión a DB establecida con Sequelize");

    const client = await db.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("Conexión a DB establecida con Pool");
  } catch (error) {
    console.error(" Error de conexión a DB:", error);
    process.exit(1);
  }
});
