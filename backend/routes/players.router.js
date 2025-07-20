import { Router } from "express";
import { PlayerController } from "./../controllers/player.controller.js";

const router = Router();

router.get("/", PlayerController.getPlayers);
router.get("/:id", PlayerController.getPlayerDetails);
router.get("/search", PlayerController.searchPlayers);
router.post("/", PlayerController.createPlayer);
router.put("/:id", PlayerController.updatePlayer);
router.delete("/:id", PlayerController.deletePlayer);

export default router;
