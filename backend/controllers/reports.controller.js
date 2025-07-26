import { validationResult } from "express-validator";
import { ReportsModel } from "./../models/reports.model.js";

const deleteReport = async (req, res) => {
  const reportId = req.params;
  if (!reportId)
    return res.status(401).json({ ok: false, msg: "Id not provided" });

  try {
    const deletedReport = await ReportsModel.deleteReport(reportId);

    if (!deletedReport) throw new Error("Error deleting report");

    return res.status(200).json({
      ok: true,
      msg: "Success deleting report",
      deletedReport: deletedReport.id,
    });
  } catch (error) {
    console.log("[CON] Error deleting report: ", error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const updateReport = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(401)
      .json({ ok: false, msg: "Invalid data", errors: errors.array() });

  const reportId = req.params;
  const reportUpdate = req.body;

  if (!reportId || reportUpdate)
    return res.status(401).json({ ok: false, msg: "Data not provided" });

  try {
    const updatedReport = await ReportsModel.updateReport(
      reportUpdate,
      reportId
    );

    if (!updatedReport) throw new Error("Error updating report");

    return res.status(201).json({
      ok: true,
      msg: "Successfully updated report",
      updatedReport: updatedReport.player_id,
    });
  } catch (error) {
    console.log("[CON] Error updating report", error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const createReport = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(401)
      .json({ ok: false, msg: "Invalid data", errors: errors.array() });

  const newReport = req.body;

  try {
    const createdReport = await ReportsModel.createReport(newReport);

    if (!createdReport) throw new Error("Error creating report");

    return res.status(201).json({
      ok: true,
      msg: "Successfully created report",
      createdReport: createdReport.player_id,
    });
  } catch (error) {
    console.log("[CON] Error creating report: ", error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const getReports = async (res) => {
  try {
    const reports = await ReportsModel.getAllReports();

    if (reports.length === 0)
      return res.status(404).json({ ok: false, msg: "Reports not found" });

    return res.status(200).json({ ok: true, reports: reports });
  } catch (error) {
    console.log("Error getting reports: ", error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};

export const ReportsController = {
  getReports,
  createReport,
  updateReport,
  deleteReport,
};
