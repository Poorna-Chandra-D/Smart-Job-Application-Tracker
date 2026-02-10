import express from 'express';
import {
  createUser,
  ensureDemoUser,
  generateToken,
  getUserByEmail,
  verifyPassword,
} from '../models/User';
import authenticateToken, { AuthRequest } from '../middleware/auth';

const router = express.Router();

const formatUser = (user: any) => ({
  id: user.id,
  email: user.email,
  firstName: user.first_name,
  lastName: user.last_name,
  name:
    [user.first_name, user.last_name].filter(Boolean).join(' ') ||
    user.email?.split('@')[0],
  createdAt: user.created_at,
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const newUser = await createUser(email, password, firstName, lastName);
    const token = generateToken(newUser.id, newUser.email);

    res.status(201).json({ token, user: formatUser(newUser) });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase();
    const demoEmail = (process.env.DEMO_USER_EMAIL || 'demo@jobtracker.com').toLowerCase();

    let user = await getUserByEmail(email);

    if (!user && normalizedEmail === demoEmail) {
      user = await ensureDemoUser();
    }

    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.email);
    res.json({ token, user: formatUser(user) });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.email) {
      return res.status(400).json({ error: 'Missing user context' });
    }

    const user = await getUserByEmail(req.email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: formatUser(user) });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Legacy OAuth placeholders (handled by /api/email routes)
router.get('/gmail', (req, res) => {
  res.json({ message: 'Gmail authentication endpoint' });
});

router.get('/gmail/callback', (req, res) => {
  res.json({ message: 'Gmail callback endpoint' });
});

router.get('/outlook', (req, res) => {
  res.json({ message: 'Outlook authentication endpoint' });
});

router.get('/outlook/callback', (req, res) => {
  res.json({ message: 'Outlook callback endpoint' });
});

export default router;
