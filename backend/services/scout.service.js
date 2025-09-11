import {Scout} from "../models/index.js";

const createScout = async (newScout) => {
  console.log(newScout);

  try {
    return await Scout.create(newScout);
  } catch (error) {
    console.log("Error creating scout profile ", error);
  }
};

const updateScout = async (updatedScout) => {
  try {
    return await Scout.update(updatedScout, {
      where: { user_id: updatedScout.userId },
    });
  } catch (error) {
    console.log("Error updating scout", error);
  }
};

export const ScoutService = {
  updateScout,
  createScout,
};
