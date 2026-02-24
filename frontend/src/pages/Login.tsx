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
        background: `
          linear-gradient(0deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.08) 0%, transparent 50%),
          linear-gradient(180deg, #000510 0%, #0a0a1a 50%, #000510 100%)
        `,
        backgroundSize: '50px 50px, 50px 50px, 100% 100%, 100% 100%, 100% 100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
          animation: 'rotate 20s linear infinite',
        },
        '@keyframes rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '4px',
            background: 'rgba(20, 20, 32, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '2px solid #00ffff',
            boxShadow: `
              0 0 20px rgba(0, 255, 255, 0.5),
              0 0 40px rgba(0, 255, 255, 0.3),
              0 0 60px rgba(0, 255, 255, 0.1),
              inset 0 0 20px rgba(0, 255, 255, 0.05)
            `,
            position: 'relative',
            '&::before': {
              content: '">"',
              position: 'absolute',
              top: 10,
              left: 10,
              color: '#00ffff',
              fontFamily: 'monospace',
              fontSize: '1.2rem',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            },
            '&::after': {
              content: '"_"',
              position: 'absolute',
              bottom: 10,
              right: 10,
              color: '#00ffff',
              fontFamily: 'monospace',
              fontSize: '1.2rem',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
              animation: 'blink 1s infinite',
            },
            '@keyframes blink': {
              '0%, 49%': { opacity: 1 },
              '50%, 100%': { opacity: 0 },
            },
          }}
        >
          <Stack spacing={2} sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '4px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid #00ffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                boxShadow: `
                  0 0 20px rgba(0, 255, 255, 0.6),
                  inset 0 0 20px rgba(0, 255, 255, 0.1)
                `,
              }}
            >
              <LockPersonIcon
                sx={{
                  fontSize: 40,
                  color: '#00ffff',
                  filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))',
                }}
              />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#00ffff',
                textTransform: 'uppercase',
                letterSpacing: '0.3rem',
                fontFamily: '"Orbitron", "Rajdhani", sans-serif',
                textShadow: `
                  0 0 10px rgba(0, 255, 255, 0.8),
                  0 0 20px rgba(0, 255, 255, 0.5),
                  0 0 30px rgba(0, 255, 255, 0.3)
                `,
              }}
            >
              LOGIN
            </Typography>
            <Typography
              sx={{
                color: '#a0a0cc',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
              }}
            >
              &gt; INITIALIZE SECURE CONNECTION_
            </Typography>
          </Stack>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: '4px',
                background: 'rgba(255, 0, 100, 0.1)',
                border: '1px solid #ff0064',
                color: '#ff0064',
                '& .MuiAlert-icon': {
                  color: '#ff0064',
                },
              }}
            >
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
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: '#e0e0ff',
                  fontFamily: 'monospace',
                  background: 'rgba(0, 0, 0, 0.3)',
                  '& fieldset': {
                    borderColor: '#00ffff',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00ffff',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ffff',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#a0a0cc',
                  fontFamily: 'monospace',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#00ffff',
                },
              }}
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
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{
                        color: '#00ffff',
                        '&:hover': {
                          color: '#00ffff',
                          filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.8))',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText="Enter the password you set during signup"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#e0e0ff',
                  fontFamily: 'monospace',
                  background: 'rgba(0, 0, 0, 0.3)',
                  '& fieldset': {
                    borderColor: '#00ffff',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00ffff',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ffff',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#a0a0cc',
                  fontFamily: 'monospace',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#00ffff',
                },
                '& .MuiFormHelperText-root': {
                  color: '#a0a0cc',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.4,
                fontWeight: 800,
                borderRadius: '4px',
                textTransform: 'uppercase',
                fontSize: '1.05rem',
                fontFamily: '"Orbitron", "Rajdhani", sans-serif',
                letterSpacing: '0.1rem',
                background: '#00ffff',
                color: '#000510',
                border: '2px solid #00ffff',
                boxShadow: `
                  0 0 20px rgba(0, 255, 255, 0.6),
                  0 0 40px rgba(0, 255, 255, 0.3),
                  inset 0 0 10px rgba(0, 255, 255, 0.2)
                `,
                '&:hover': {
                  background: '#00ffff',
                  boxShadow: `
                    0 0 30px rgba(0, 255, 255, 0.8),
                    0 0 60px rgba(0, 255, 255, 0.5),
                    inset 0 0 20px rgba(0, 255, 255, 0.3)
                  `,
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'rgba(0, 255, 255, 0.3)',
                  color: '#000510',
                },
              }}
            >
              {loading ? 'INITIALIZING…' : 'SIGN IN'}
            </Button>
          </Box>

          <Stack spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleDemoLogin}
              disabled={loading}
              startIcon={<BoltIcon />}
              sx={{
                borderRadius: '4px',
                textTransform: 'uppercase',
                fontWeight: 700,
                fontFamily: 'monospace',
                letterSpacing: '0.05rem',
                borderWidth: 2,
                borderColor: '#ff00ff',
                color: '#ff00ff',
                background: 'rgba(255, 0, 255, 0.05)',
                boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
                '&:hover': {
                  borderColor: '#ff00ff',
                  background: 'rgba(255, 0, 255, 0.15)',
                  boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)',
                  borderWidth: 2,
                },
              }}
            >
              Launch demo workspace
            </Button>
            <Typography
              sx={{
                textAlign: 'center',
                color: '#a0a0cc',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
              }}
            >
              Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}
            </Typography>
            <Button
              onClick={() => navigate('/demo')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontFamily: 'monospace',
                color: '#ff00ff',
                '&:hover': {
                  color: '#ff00ff',
                  textShadow: '0 0 10px rgba(255, 0, 255, 0.8)',
                  background: 'rgba(255, 0, 255, 0.05)',
                },
              }}
            >
              &gt; Preview the product tour_
            </Button>
          </Stack>

          <Typography
            sx={{
              textAlign: 'center',
              mt: 4,
              color: '#a0a0cc',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
            }}
          >
            New here?{' '}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: '#ff00ff',
                cursor: 'pointer',
                textShadow: '0 0 5px rgba(255, 0, 255, 0.5)',
                '&:hover': {
                  textShadow: '0 0 10px rgba(255, 0, 255, 0.8)',
                },
              }}
              onClick={() => navigate('/signup')}
            >
              CREATE ACCOUNT
            </Typography>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
