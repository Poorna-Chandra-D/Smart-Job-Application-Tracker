import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import BoltIcon from '@mui/icons-material/Bolt';
import { authService } from '../services/api';
import { notifyAuthChange } from '../utils/authEvents';

interface LoginProps {
  onAuthSuccess?: () => void;
}

const DEMO_EMAIL = 'demo@jobtracker.com';
const DEMO_PASSWORD = 'demo123!';

const Login: React.FC<LoginProps> = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const finalizeAuth = (data: { token: string; user: unknown }) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    notifyAuthChange();
    onAuthSuccess?.();
    navigate('/');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password');
      return;
    }

    setLoading(true);
    try {
      const { data } = await authService.login(formData);
      finalizeAuth(data);
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to log in';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setFormData({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
    setError('');
    setLoading(true);
    try {
      const { data } = await authService.login({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
      finalizeAuth(data);
    } catch (err: any) {
      const message = err.response?.data?.error || 'Demo login unavailable right now';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 10% 20%, #1d1b2f, #0f0e1b 55%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '30px',
            background: 'rgba(255,255,255,0.98)',
            boxShadow: '0 35px 80px rgba(4, 6, 24, 0.6)',
          }}
        >
          <Stack spacing={2} sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '26px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
              }}
            >
              <LockPersonIcon sx={{ fontSize: 40, color: '#fff' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1d1b2f' }}>
              Welcome back to JobTracker
            </Typography>
            <Typography sx={{ color: '#6a6887' }}>
              Pick up where you left off, sync email, and keep every recruiter conversation on track.
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText="Enter the password you set during signup"
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.4,
                fontWeight: 800,
                borderRadius: '16px',
                textTransform: 'none',
                fontSize: '1.05rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
              }}
            >
              {loading ? 'Signing you in…' : 'Sign in'}
            </Button>
          </Box>

          <Stack spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleDemoLogin}
              disabled={loading}
              startIcon={<BoltIcon />}
              sx={{
                borderRadius: '14px',
                textTransform: 'none',
                fontWeight: 700,
                borderWidth: 2,
              }}
            >
              Launch demo workspace
            </Button>
            <Typography sx={{ textAlign: 'center', color: '#6a6887' }}>
              Demo email {DEMO_EMAIL} · password {DEMO_PASSWORD}
            </Typography>
            <Button
              onClick={() => navigate('/demo')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: '#4b47ff',
              }}
            >
              Just exploring? Preview the product tour
            </Button>
          </Stack>

          <Typography sx={{ textAlign: 'center', mt: 4, color: '#6a6887' }}>
            New here?{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}
              onClick={() => navigate('/signup')}
            >
              Create an account
            </Typography>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
