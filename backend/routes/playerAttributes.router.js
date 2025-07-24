import { Router } from "express";
import { PlayerAttributesController } from "../controllers/playerAttributes.controller.js";

const router = Router();

router.get("/", PlayerAttributesController.getPlayersAttributes);
router.post("/:id", PlayerAttributesController.createPlayerAttributes)
router.get("/:id", PlayerAttributesController.getPlayerAttributesById);
router.put("/", PlayerAttributesController.updatePlayerAttributes);

export default router;
