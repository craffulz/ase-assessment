import {db} from "../database/connection.database.js";

const getStats = async () => {
  const query = {
    text: `
        SELECT * from dashboard
        `,
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.log("[MODEL] Error getting stats: ", error);
    throw error;
  }
};

export default DashboardModel = {
  getStats,
};
