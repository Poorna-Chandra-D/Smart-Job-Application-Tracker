"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationsBySource = exports.getApplicationsPerWeek = exports.getAnalyticsSummary = void 0;
const database_1 = require("../config/database");
const getAnalyticsSummary = async (userId) => {
    const result = await database_1.pool.query(`SELECT
      COUNT(*) as total_applications,
      SUM(CASE WHEN status = 'Applied' THEN 1 ELSE 0 END) as applied,
      SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress,
      SUM(CASE WHEN status = 'Interview' THEN 1 ELSE 0 END) as interviews,
      SUM(CASE WHEN status = 'Offer' THEN 1 ELSE 0 END) as offers,
      SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
    FROM applications
    WHERE user_id = $1`, [userId]);
    return result.rows[0];
};
exports.getAnalyticsSummary = getAnalyticsSummary;
const getApplicationsPerWeek = async (userId) => {
    const result = await database_1.pool.query(`SELECT 
      DATE_TRUNC('week', application_date) as week,
      COUNT(*) as count
    FROM applications
    WHERE user_id = $1
    GROUP BY DATE_TRUNC('week', application_date)
    ORDER BY week DESC
    LIMIT 12`, [userId]);
    return result.rows;
};
exports.getApplicationsPerWeek = getApplicationsPerWeek;
const getApplicationsBySource = async (userId) => {
    const result = await database_1.pool.query(`SELECT source, COUNT(*) as count
    FROM applications
    WHERE user_id = $1
    GROUP BY source
    ORDER BY count DESC`, [userId]);
    return result.rows;
};
exports.getApplicationsBySource = getApplicationsBySource;
//# sourceMappingURL=analyticsService.js.map