import { Router } from "express";
import { PlayersController } from "./../controllers/players.controller.js";
import { accessTokenMiddleware } from "../middlewares/accessToken.middleware.js";
const router = Router();

router.get("/", accessTokenMiddleware, PlayersController.getPlayers);
router.get("/:id", PlayersController.getPlayerDetails);
router.post("/", PlayersController.createPlayer);
router.put("/:id", PlayersController.updatePlayer);
router.delete("/:id", PlayersController.deletePlayer);

export default router;
