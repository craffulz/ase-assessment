import { usersData } from "../data/users.data.js";

export const seedUsers = async (authModel) => {
  try {
    authModel.bulkCreate(usersData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error al seedear la tabla de auth", error);
  }
};
