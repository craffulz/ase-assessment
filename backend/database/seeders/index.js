import { seedUsers } from "./auth.seeder.js";
import { seedPlayers } from "./player.seeder.js";
import { seedPlayerAttributes } from "./playerAttributes.seeder.js";
import { seedReports } from "./report.seeder.js";
import { seedScouts } from "./scout.seeder.js";
export const seedDatabase = async (models) => {

  console.log('Executing the seeder! 🌱🌱', models)

  try {
    await seedUsers(models.Auth);
    await seedPlayers(models.Player);
    await seedScouts(models.Scout, models.Auth);
    await seedPlayerAttributes(models.PlayerAttributes);
    await seedReports(models.Report, models.Scout);
    console.log("Database seeded! 🌱");
  } catch (error) {
    console.log("Error seeding database", error);
    throw error;
  }
};
 