import { reportsData } from "../data/reports.data.js";

export const seedReports = async (reportModel) => {
  try {
    await reportModel.bulkCreate(reportsData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error seeding reports", error);
  }
};
