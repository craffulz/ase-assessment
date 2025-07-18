import e from "express";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

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
app.use("/api/players",  playersRouter);
app.use("/api/reports", accessTokenMiddleware, reportsRouter);
//app.use("/api/dashboard", accessTokenMiddleware, dashboardRouter);

app.listen(process.env.PORT, () => {
  console.log("EXPRESS LISTENING PORT: ", process.env.PORT);
});
