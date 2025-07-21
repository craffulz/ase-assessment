import { validationResult } from "express-validator";
import { PlayerAttributesService } from "../services/playerAttributes.service.js";

const getPlayerAttributesById = async (req, res) => {
  const playerId = req.params;

  try {
    const playerAttributes =
      await PlayerAttributesService.getPlayerAttributesById(playerId);

    if (!playerAttributes) {
      return res.status(400).json({ ok: false, msg: "Player atts not found" });
    }

    return res.status(200).json({
      ok: true,
      msg: "Success getting player atts",
      playerAttributes: playerAttributes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const getPlayersAttributes = async (req, res) => {
  try {
    const playersAttributes =
      await PlayerAttributesService.getAllPlayerAttributes();

    if (!playersAttributes)
      return res.status(400).json({ ok: false, msg: "Players atts not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const updatePlayerAttributes = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ ok: false, msg: "Invalid data", errors: errors.array() });

  try {
    const playerId = req.params;
    const attributesUpdate = req.body;

    const updatedAttributes =
      await PlayerAttributesService.updatePlayerAttributes(
        attributesUpdate,
        playerId
      );

    if (updatedAttributes.length === 0)
      return res.status(400).json({ ok: false, msg: "Player atts not found" });

    return res.status(201).json({
      ok: true,
      msg: "Success updating attributes",
      updatedAttributes: updatedAttributes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

export const PlayerAttributesController = {
  getPlayerAttributesById,
  getPlayersAttributes,
  updatePlayerAttributes,
};
