import {Report} from "../models/index.js";

const deleteReport = async (reportId) => {
  try {
    return await Report.destroy({ where: { id: reportId } });
  } catch (error) {
    console.log("[MODEL] Error deleting report: ", error);
    throw error;
  }
};

const updateReport = async (updatedReport, reportId) => {
  try {
    return await Report.update(updatedReport, { where: { id: reportId } });
  } catch (error) {
    console.log("[MODEL] Error updating report: ", error);
    throw error;
  }
};

const createReport = async (newReport) => {
  try {
    return await Report.create(newReport);
  } catch (error) {
    console.log("[MODEL] Error creating report: ", error);
    throw error;
  }
};

const getAllReports = async () => {
  try {
    return await Report.findAll();
  } catch (error) {
    console.log("[MODEL] Error getting reports: ", error);
    throw error;
  }
};
export const ReportService = {
  getAllReports,
  createReport,
  deleteReport,
  updateReport,
};
