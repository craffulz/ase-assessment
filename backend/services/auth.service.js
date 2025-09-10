import Auth from "../models/index.js";

const getUserByEmail = async (userEmail) => {
  try {
    return await Auth.findOne({ where: { email: userEmail } });
  } catch (error) {
    console.log("Error getting user: ", error);
  }
};

const createUser = async (newUser) => {
  console.log("MODEL", newUser);

  try {
    return await Auth.create(newUser);
  } catch (error) {
    console.log("[MODEL] Error registering user: ", error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    return await Auth.destroy(userId);
  } catch (error) {
    console.log("Error deleting user: ", error);
  }
};
export const AuthService = {
  deleteUser,
  createUser,
  getUserByEmail,
};
