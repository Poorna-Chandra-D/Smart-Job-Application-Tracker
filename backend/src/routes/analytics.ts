import express from 'express';
import { pool } from '../index';

const router = express.Router();

// Get analytics summary
router.get('/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) as total_applications,
        SUM(CASE WHEN status = 'Applied' THEN 1 ELSE 0 END) as applied,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'Interview' THEN 1 ELSE 0 END) as interviews,
        SUM(CASE WHEN status = 'Offer' THEN 1 ELSE 0 END) as offers,
        SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
      FROM applications
    `);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get applications by week
router.get('/applications-per-week', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DATE_TRUNC('week', application_date) as week, COUNT(*) as count
      FROM applications
      GROUP BY DATE_TRUNC('week', application_date)
      ORDER BY week DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weekly data' });
  }
});

export default router;
