import PlayerAttributes from "../models/playerAttributes.model.js";

const createPlayerAttributes = async (playerAttributes) => {
  try {
    return await PlayerAttributes.create(playerAttributes);
  } catch (error) {
    throw new Error(`Error creating attributes: ${error.message}`);
  }
};

const updatePlayerAttributes = async (attributesUpdate, playerId) => {
  try {
    const [affectedRows] = await PlayerAttributes.update(attributesUpdate, {
      where: { player_id: playerId },
    });

    return affectedRows;
  } catch (error) {
    throw new Error(`Error updating attributes: ${error.message}`);
  }
};

const getPlayerAttributesById = async (playerId) => {
  try {
    const attributes = await PlayerAttributes.findByPk(playerId);
    return attributes;
  } catch (error) {
    throw new Error(`Error fetching attributes: ${error.message}`);
  }
};

const deletePlayerAttributes = async (playerId) => {
  try {
    const deletedCount = await PlayerAttributes.destroy({
      where: { player_id: playerId },
    });

    if (deletedCount === 0) {
      throw new Error("Player attributes not found");
    }

    return { deleted: true, count: deletedCount };
  } catch (error) {
    throw new Error(`Error deleting attributes: ${error.message}`);
  }
};

const getAllPlayerAttributes = async () => {
  try {
    const playersAttributes = await PlayerAttributes.findAll();
    return playersAttributes;
  } catch (error) {
    throw new Error(`Error fetching all attributes: ${error.message}`);
  }
};

export const PlayerAttributesService = {
  createPlayerAttributes,
  updatePlayerAttributes,
  getPlayerAttributesById,
  deletePlayerAttributes,
  getAllPlayerAttributes,
};
