import { seedUsers } from "./auth.seeder.js";
import { seedPlayers } from "./player.seeder.js";
import { seedPlayerAttributes } from "./playerAttributes.seeder.js";
import { seedReports } from "./report.seeder.js";
import { seedScouts } from "./scout.seeder.js";
export const seedDatabase = async () => {
  try {
    seedUsers();
    seedPlayers();
    seedScouts();
    seedPlayerAttributes();
    seedReports();
  } catch (error) {
    console.log("Error seeding database", error);
    throw error;
  }
};
