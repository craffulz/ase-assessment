import { Router } from "express";
import { PlayerAttributesController } from "../controllers/playerAttributes.controller.js";

const router = Router();

router.get("/", PlayerAttributesController.getPlayersAttributes);
router.put("/", PlayerAttributesController.updatePlayerAttributes);

router.post("/:id", PlayerAttributesController.createPlayerAttributes)
router.get("/:id", PlayerAttributesController.getPlayerAttributesById);


export default router;
