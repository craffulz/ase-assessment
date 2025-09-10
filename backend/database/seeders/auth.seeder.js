import Auth from "../../models/auth.model.js";
import { usersData } from "../data/users.data.js";

export const seedUsers = async () => {
  try {
    await Auth.bulkCreate(usersData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error al seedear la tabla de auth", error);
  }
};
