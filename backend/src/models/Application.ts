import { pool } from '../config/database';

export interface Application {
  id: number;
  user_id: number;
  company_name: string;
  job_title: string;
  status: 'Applied' | 'In Progress' | 'Interview' | 'Offer' | 'Rejected' | 'Withdrawn';
  source: string;
  application_link?: string;
  application_date: Date;
  created_at: Date;
  updated_at: Date;
}

export const getApplicationsByUser = async (userId: number) => {
  const result = await pool.query(
    'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

export const createApplication = async (data: Partial<Application>) => {
  const result = await pool.query(
    `INSERT INTO applications (user_id, company_name, job_title, status, source, application_link, application_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      data.user_id,
      data.company_name,
      data.job_title,
      data.status || 'Applied',
      data.source,
      data.application_link,
      data.application_date || new Date(),
    ]
  );
  return result.rows[0];
};

export const updateApplication = async (id: number, data: Partial<Application>) => {
  const result = await pool.query(
    `UPDATE applications SET company_name = COALESCE($1, company_name),
     job_title = COALESCE($2, job_title), status = COALESCE($3, status),
     source = COALESCE($4, source), updated_at = NOW() WHERE id = $5 RETURNING *`,
    [data.company_name, data.job_title, data.status, data.source, id]
  );
  return result.rows[0];
};
