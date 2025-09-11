import { playerAttributesData } from "../data/playerAttributes.data.js";

export const seedPlayerAttributes = async (playerAttributesModel) => {
  try {
    await playerAttributesModel.bulkCreate(playerAttributesData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error seeding player attributes", error);
  }
};
