import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import e from "express";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./models/index.js";

import authRouter from "./routes/auth.router.js";
import playersRouter from "./routes/player.router.js";
import reportsRouter from "./routes/report.router.js";
import playerAttributesRouter from "./routes/playerAttributes.router.js";
import { accessTokenMiddleware } from "./middlewares/accessToken.middleware.js";

config();

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
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

let isDBConnected = false;

if (!isDBConnected) {
  console.log("Entro a la condicion de no conectado");
  try {
    await connectDB();
    isDBConnected = true;
  } catch (error) {
    console.log("❌ Error al conectar la base de datos");
  }
}

app.use(e.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ["https://ase-assessment.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", authRouter);
app.use("/api/players", playersRouter);
app.use("/api/reports", accessTokenMiddleware, reportsRouter);
app.use("/api/playerAttributes", accessTokenMiddleware, playerAttributesRouter);

app.use((err, req, res, next) => {
  console.error("❌ Error global:", err.stack);
  res.status(500).json({ error: "Algo salió mal" });
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "¡Backend funcionando correctamente!",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

if (process.env.NODE_ENV === "development") {
  try {
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port:", process.env.PORT);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}
