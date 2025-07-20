import {db} from "./../database/connection.database.js";

const createScout = async (scout) => {
  console.log(scout);

  const query = {
    text: `
        INSERT INTO scouts 
        (user_id, full_name, license_number, organization)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
    values: [
      scout.userId,
      scout.fullName,
      scout.licenseNumber,
      scout.organization,
    ],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("Error creating scout profile ", error);
  }
};

const updateScout = async (scoutUpdate) => {
  const query = {
    text: `
        UPDATE scouts
        SET full_name = $1,
            license_number = $2,
            organization = $3
        WHERE user_id = $4
        RETURNING *
        `,
    values: [
      scoutUpdate.fullName,
      scoutUpdate.licenseNumber,
      scoutUpdate.organization,
      scoutUpdate.userId,
    ],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("Error updating scout", error);
  }
};

export const ScoutsModel = {
  updateScout,
  createScout,
};
