import { playerAttributesData } from "../data/playerAttributes.data.js";
import PlayerAttributes from "../../models/playerAttributes.model.js";

export const seedPlayerAttributes = async () => {
  try {
    await PlayerAttributes.bulkCreate(playerAttributesData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error seeding player attributes", error);
  }
};
