import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import { accessTokenMiddleware } from "../middlewares/accessToken.middleware.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", loginMiddleware, AuthController.login);
router.post("/logout", AuthController.logout);

export default router;
