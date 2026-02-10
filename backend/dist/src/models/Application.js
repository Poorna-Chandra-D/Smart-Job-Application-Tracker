"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplication = exports.createApplication = exports.getApplicationsByUser = void 0;
const database_1 = require("../config/database");
const getApplicationsByUser = async (userId) => {
    const result = await database_1.pool.query('SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
};
exports.getApplicationsByUser = getApplicationsByUser;
const createApplication = async (data) => {
    const result = await database_1.pool.query(`INSERT INTO applications (user_id, company_name, job_title, status, source, application_link, application_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
        data.user_id,
        data.company_name,
        data.job_title,
        data.status || 'Applied',
        data.source,
        data.application_link,
        data.application_date || new Date(),
    ]);
    return result.rows[0];
};
exports.createApplication = createApplication;
const updateApplication = async (id, data) => {
    const result = await database_1.pool.query(`UPDATE applications SET company_name = COALESCE($1, company_name),
     job_title = COALESCE($2, job_title), status = COALESCE($3, status),
     source = COALESCE($4, source), updated_at = NOW() WHERE id = $5 RETURNING *`, [data.company_name, data.job_title, data.status, data.source, id]);
    return result.rows[0];
};
exports.updateApplication = updateApplication;
//# sourceMappingURL=Application.js.map