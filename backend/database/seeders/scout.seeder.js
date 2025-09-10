import { scoutsData } from "../data/scouts.data.js";
import Auth from "../../models/scout.model.js";
import Scout from "../../models/scout.model.js";
console.log(scoutsData);

export const seedScouts = async () => {
  try {
    scoutsData.forEach(async (scout) => {
      const user = await Auth.findOne({ where: { email: scout.email } });
      user ? (scout.user_id = user.id) : console.log("No user found");
    });

    await Scout.bulkCreate(scoutsData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error seeding scouts", error);
  }
};
