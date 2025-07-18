import db from "../database/connection.database.js";

const deleteReport = async (reportId) => {
  const query = {
    text: `
        DELETE from scout_reports
        WHERE id = $1
        RETURNING *`,
    values: [reportId],
  };
  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error deleting report: ", error);
    throw error;
  }
};

const updateReport = async (reportUpdate, reportId) => {
  const query = {
    text: `
        UPDATE scout_reports
        SET match_date = $1, 
            overall_rating = $2, 
            strengths = $3, 
            weaknesses = $4, 
            recommendation = $5
        WHERE id = $6 
        `,
    values: [...reportUpdate, reportId],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error updating report: ", error);
    throw error;
  }
};

const createReport = async (newReport) => {
  const query = {
    text: `
        INSERT INTO scout_reports 
        (player_id, scout_id, match_date, overall_rating, strengths, weaknesses, recommendation)
        values ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
    values: [...newReport],
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error creating report: ", error);
    throw error;
  }
};

const getAllReports = async () => {
  const query = {
    text: `
        SELECT * from scout_reports
        `,
  };

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.log("[MODEL] Error getting reports: ", error);
    throw error;
  }
};
export const ReportsModel = {
  getAllReports,
  createReport,
  deleteReport,
  updateReport,
};
