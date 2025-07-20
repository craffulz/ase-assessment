import {db} from "./../database/connection.database.js";

const getUserByEmail = async (userEmail) => {
  const query = {
    text: `
        SELECT * FROM users
        WHERE email = $1
        `,
    values: [userEmail],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("Error getting user: ", error);
  }
};

const createUser = async (newUser) => {
  console.log("MODEL", newUser);

  const query = {
    text: ` 
        INSERT INTO users
        (email, password_hash, name)
        values ($1, $2, $3)
        RETURNING * 
        `,
    values: [newUser.email, newUser.password_hash, newUser.name],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error registering user: ", error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  const query = {
    text: `
    DELETE FROM users WHERE id = $1
    RETURNING *
    `,
    values: [userId],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("Error deleting user: ", error);
  }
};

export const AuthModel = {
  deleteUser,
  createUser,
  getUserByEmail,
};
