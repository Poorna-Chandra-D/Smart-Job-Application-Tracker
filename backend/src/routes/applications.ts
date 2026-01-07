import express from 'express';
import { pool } from '../index';

const router = express.Router();

// Get all applications
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get application by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Create application
router.post('/', async (req, res) => {
  const { company_name, job_title, status, source, application_date } = req.body;
  try {
    console.log('Creating application:', { company_name, job_title, status, application_date });
    const result = await pool.query(
      'INSERT INTO applications (company_name, job_title, status, source, application_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [company_name, job_title, status || 'Applied', source || 'Manual', application_date || new Date()]
    );
    console.log('Application created:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// Update application
router.put('/:id', async (req, res) => {
  const { company_name, job_title, status, source } = req.body;
  try {
    const result = await pool.query(
      'UPDATE applications SET company_name = $1, job_title = $2, status = $3, source = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [company_name, job_title, status, source, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM applications WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

export default router;
