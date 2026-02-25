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

// Generate demo data
router.post('/demo/generate', async (req, res) => {
  try {
    const demoApplications = [
      {
        company_name: 'Google',
        job_title: 'Senior Software Engineer',
        status: 'Interview Scheduled',
        source: 'LinkedIn',
        application_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        company_name: 'Microsoft',
        job_title: 'Cloud Solutions Architect',
        status: 'Applied',
        source: 'Company Website',
        application_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        company_name: 'Amazon',
        job_title: 'Frontend Developer',
        status: 'Offer',
        source: 'Recruiter',
        application_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      },
      {
        company_name: 'Meta',
        job_title: 'Full Stack Engineer',
        status: 'Rejected',
        source: 'LinkedIn',
        application_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
      },
      {
        company_name: 'Apple',
        job_title: 'iOS Developer',
        status: 'Interview Scheduled',
        source: 'Company Website',
        application_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        company_name: 'Netflix',
        job_title: 'Backend Engineer',
        status: 'Applied',
        source: 'Referral',
        application_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        company_name: 'Tesla',
        job_title: 'Software Engineer',
        status: 'Applied',
        source: 'LinkedIn',
        application_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        company_name: 'Stripe',
        job_title: 'Platform Engineer',
        status: 'Interview Scheduled',
        source: 'Company Website',
        application_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        company_name: 'Airbnb',
        job_title: 'Product Engineer',
        status: 'Applied',
        source: 'LinkedIn',
        application_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        company_name: 'Uber',
        job_title: 'Data Engineer',
        status: 'Declined',
        source: 'Recruiter',
        application_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ];

    const insertedApplications = [];

    for (const app of demoApplications) {
      const result = await pool.query(
        'INSERT INTO applications (company_name, job_title, status, source, application_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [app.company_name, app.job_title, app.status, app.source, app.application_date]
      );
      insertedApplications.push(result.rows[0]);
    }

    res.status(201).json({
      message: `Successfully created ${insertedApplications.length} demo applications`,
      applications: insertedApplications
    });
  } catch (error) {
    console.error('Error generating demo data:', error);
    res.status(500).json({ error: 'Failed to generate demo data' });
  }
});

export default router;
