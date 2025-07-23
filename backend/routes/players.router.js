import { Router } from "express";
import { PlayerController } from "./../controllers/player.controller.js";
import { accessTokenMiddleware } from "../middlewares/accessToken.middleware.js";
const router = Router();

router.get("/", accessTokenMiddleware, PlayerController.getPlayers);
router.get("/search", accessTokenMiddleware, PlayerController.searchPlayers);
router.post("/", accessTokenMiddleware, PlayerController.createPlayer);


router.get("/:id", accessTokenMiddleware, PlayerController.getPlayerDetails);
router.put("/:id", accessTokenMiddleware, PlayerController.updatePlayer);
router.delete("/:id", accessTokenMiddleware, PlayerController.deletePlayer);

export default router;
