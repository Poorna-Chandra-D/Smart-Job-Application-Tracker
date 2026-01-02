import express from 'express';

const router = express.Router();

// Get user emails
router.get('/', (req, res) => {
  res.json({ message: 'Get emails endpoint' });
});

// Parse emails for job applications
router.post('/parse', (req, res) => {
  res.json({ message: 'Parse emails endpoint' });
});

// Sync emails
router.post('/sync', (req, res) => {
  res.json({ message: 'Sync emails endpoint' });
});

export default router;
