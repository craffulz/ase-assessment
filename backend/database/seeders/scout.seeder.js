import { scoutsData } from "../data/scouts.data.js";

export const seedScouts = async (scoutModel, authModel) => {
  try {
    const scoutsToCreate = [];

    console.log('shno hadaa',authModel)

    for (const scout of scoutsData) {
      console.log("Procesando scout:", scout.email);

      const user = await authModel.findOne({ where: { email: scout.email } });

      if (user) {
        scoutsToCreate.push({
          ...scout,
          user_id: user.id,
        });
      } else {
        console.log("No user found for email:", scout.email);
      }
    }

    console.log("Esto es el con los ids", scoutsToCreate);

    await scoutModel.bulkCreate(scoutsToCreate, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error seeding scouts", error);
  }
};
