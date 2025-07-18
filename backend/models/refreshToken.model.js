import db from "../database/connection.database.js";

const getToken = async (token) => {
  console.log(token);
  const query = {
    text: `
    SELECT * from refresh_tokens
    WHERE token = $1
    `,
    values: [token],
  };
  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("Error getting token: ");
    throw error;
  }
};

const insertToken = async (token, user_id, ip) => {
  const query = {
    text: `
    INSERT INTO refresh_tokens
    (user_id, token, expires_at, ip)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    values: [user_id, token, token.expires_at, ip],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("Error inserting refresh token: ", error);
    throw error;
  }
};

const revokeToken = async (token) => {
  const query = {
    text: `
        UPDATE refresh_tokens
        SET is_revoked = true
        WHERE token = $1
        RETURNING*
        `,
    values: [token],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("Error revoking refresh token: ", error);
  }
};

const deleteExpired = async () => {
  const query = {
    text: `
        DELETE from refresh_tokens
        WHERE expires_at <= NOW()
        `,
  };

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.log("Error deleting expired tokens: ", error);
    throw error;
  }
};

const deleteToken = async (userId) => {
  console.log(userId);
  const query = {
    text: `
        DELETE FROM refresh_tokens
        WHERE user_id = $1
        `,
    values: [userId],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("Error deleting refresh token: ", error);
    throw error;
  }
};

export const RefreshTokenModel = {
  insertToken,
  getToken,
  deleteExpired,
  revokeToken,
  deleteToken,
};
