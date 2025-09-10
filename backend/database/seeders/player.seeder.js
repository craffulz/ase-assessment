import { playersData } from "../data/players.data.js";
import Player from "../../models/player.model.js";
console.log(playersData);

export const seedPlayers = async () => {
  try {
    await Player.bulkCreate(playersData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error al insertar los jugadores", error);
    throw error;
  }
};
