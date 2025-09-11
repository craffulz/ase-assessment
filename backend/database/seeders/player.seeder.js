import { playersData } from "../data/players.data.js";

export const seedPlayers = async (playerModel) => {
  try {
    await playerModel.bulkCreate(playersData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error al insertar los jugadores", error);
    throw error;
  }
};
