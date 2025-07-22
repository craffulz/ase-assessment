import { validationResult } from "express-validator";
import { PlayerService } from "../services/player.service.js";

const deletePlayer = async (req, res) => {
  const playerId = req.params;

  if (!playerId)
    return res.status(400).json({ ok: false, msg: "Id not provided" });

  try {
    const deletedPlayer = await PlayerService.deletePlayer(playerId);

    if (!deletedPlayer) throw new Error("Error deleting player");

    return res
      .status(200)
      .json({ ok: true, playerDeleted: deletedPlayer.name });
  } catch (error) {
    console.log("[CON] Error deleting player", error);
    return res
      .status(500)
      .json({ ok: false, msg: "Server error", error: error });
  }
};

const updatePlayer = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ ok: false, msg: "Not valid data", errors: errors.array() });
  }

  const playerId = req.params;
  const playerUpdate = req.body;

  if (!playerId || !playerUpdate) {
    return res.status(400).json({ ok: false, msg: "Data not provided" });
  }

  try {
    const updatedPlayer = await PlayerService.updatePlayer(
      playerUpdate,
      playerId
    );

    if (!updatedPlayer) throw new Error("Error updating player");

    return res.status(201).json({
      ok: true,
      msg: "Successfully updated player",
      playerUpdated: updatedPlayer.name,
    });
  } catch (error) {
    console.log("[CON] Error updating player: ", error);
    return res.status(500).json({ ok: false, msg: "Error server" });
  }
};

const createPlayer = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ ok: false, msg: "Not valid data", errors: errors.array() });

  const newPlayer = req.body;

  try {
    const createdPlayer = await PlayerService.createPlayer(newPlayer);

    if (!createdPlayer) throw new Error("Error creating player");

    return res.status(201).json({
      ok: true,
      msg: "Successfully created player!",
      newPlayer: createdPlayer.name,
    });
  } catch (error) {
    console.log("[CON] Error creating player: ", error);
    return res
      .status(500)
      .json({ ok: false, msg: "Server error", error: error });
  }
};

const getPlayerDetails = async (req, res) => {
  const playerId = req.params;

  if (!playerId)
    return res.status(400).json({ ok: false, msg: "Player ID not provided" });
  try {
    const playerDetails = await PlayerService.getPlayerById(playerId);

    if (!playerDetails)
      return res.status(404).json({ ok: false, msg: "Player not found" });

    return res.status(200).json({ ok: true, playerDetails: playerDetails });
  } catch (error) {
    console.log("[CON] Error getting player details: ", error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await PlayerService.getAllPlayers();

    if (players.length === 0)
      return res.status(404).json({ ok: false, msg: "Players not found" });

    return res.status(200).json({ ok: true, players: players });
  } catch (error) {
    console.log("[CON] Error getting players: ", error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const searchPlayers = async (req, res) => {
  console.log("[CON] limit: ", typeof req.query.limit);
  try {
    const result = await PlayerService.findPlayers({
      page: req.query.page || 1,
      limit: req.query.limit,
      filters: req.query,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    });

    console.log("probando probandopoo", result.players);

    return res.status(200).json({
      players: result.players,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

export const PlayerController = {
  searchPlayers,
  getPlayers,
  getPlayerDetails,
  updatePlayer,
  createPlayer,
  deletePlayer,
};
