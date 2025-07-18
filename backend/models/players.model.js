import db from "../database/connection.database.js";

const deletePlayer = async (playerId) => {
  const query = {
    text: `
        DELETE FROM players
        WHERE id = $1
        RETURNING * 
        `,
    values: [playerId],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error deleting player: ", error);
    throw error;
  }
};

const updatePlayer = async (playerUpdate, playerId) => {
  const query = {
    text: `
        UPDATE players
        SET name = $1, 
            position = $2, 
            age = $3, 
            team = $4, 
            nationality = $5, 
            height = $6, 
            weight = $7, 
            goals = $8, 
            assists = $9, 
            appearances = $10, 
            contract_salary = $11, 
            contract_end = $12, 
            market_value = $13,
        WHERE id = $14
        RETURNING *
        `,

    values: [...playerUpdate, playerId],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error updating player: ", error);
    throw error;
  }
};
/**
 *
 * @param {} player Object containing all player details, data validation in controller
 */
const createPlayer = async (newPlayer) => {
  const query = {
    text: `
    INSERT INTO 
    players (name, position, age, team, nationality, height, weight, 
            goals, assists, appearances, contract_salary, contract_end, market_value)
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *
    `,
    values: [...newPlayer],
  };
  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error creating player: ", error);
    throw error;
  }
};

const getPlayerDetails = async (playerId) => {
  const query = {
    text: `SELECT * FROM players WHERE id = $1`,
    values: [playerId],
  };
  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error getting player details: ", error);
    throw error;
  }
};

const getAllPlayers = async () => {
  const query = {
    text: `SELECT * FROM players`,
  };

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.log("[MODEL] Error getting players: ", error);
    throw error;
  }
};

export const PlayersModel = {
  getAllPlayers,
  getPlayerDetails,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
