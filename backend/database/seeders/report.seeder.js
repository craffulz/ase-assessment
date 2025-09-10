import { reportsData } from "../data/reports.data.js";
import Report from "../../models/report.model.js";
import Scout from "../../models/report.model.js";

export const seedReports = async () => {
  try {
    reportsData.forEach(async (report) => {
      const scout = await Scout.findOne({ where: { id: report.scout_id } });
      scout ? (report.scout_id = scout.id) : console.log("No scout found");
    });

    await Report.bulkCreate(reportsData, {
      validate: true,
      ignoreDuplicates: true,
      returning: true,
    });
  } catch (error) {
    console.log("Error seeding reports", error);
  }
};
