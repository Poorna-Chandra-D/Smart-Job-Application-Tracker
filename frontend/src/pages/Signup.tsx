import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Alert,
  Grid,
  Container,
  IconButton,
  InputAdornment,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { authService } from '../services/api';
import { notifyAuthChange } from '../utils/authEvents';

interface SignupProps {
  onAuthSuccess?: () => void;
}

const Signup: React.FC<SignupProps> = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please complete all fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await authService.register(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      notifyAuthChange();
      onAuthSuccess?.();
      navigate('/');
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to create account';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: `
          radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0f 0%, #1a0f2e 50%, #0f0a1f 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 0, 128, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 128, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
          pointerEvents: 'none',
        },
        '@keyframes gridMove': {
          '0%': {
            transform: 'translate(0, 0)',
          },
          '100%': {
            transform: 'translate(50px, 50px)',
          },
        },
        '@keyframes neonPulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(255, 0, 128, 0.3), 0 0 60px rgba(255, 0, 128, 0.2), inset 0 0 20px rgba(255, 0, 128, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 0, 128, 0.7), 0 0 60px rgba(255, 0, 128, 0.5), 0 0 90px rgba(255, 0, 128, 0.3), inset 0 0 30px rgba(255, 0, 128, 0.15)',
          },
        },
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '16px',
            background: 'rgba(20, 20, 32, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 0, 128, 0.3)',
            boxShadow: '0 0 30px rgba(255, 0, 128, 0.4), 0 0 60px rgba(255, 0, 128, 0.2), inset 0 0 20px rgba(255, 0, 128, 0.05)',
            animation: 'neonPulse 3s ease-in-out infinite',
            position: 'relative',
            '&::before': {
              content: '">"',
              position: 'absolute',
              top: '20px',
              left: '20px',
              color: 'rgba(255, 0, 128, 0.6)',
              fontSize: '24px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
            },
            '&::after': {
              content: '"_"',
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              color: 'rgba(255, 0, 128, 0.6)',
              fontSize: '24px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              animation: 'blink 1s step-end infinite',
            },
            '@keyframes blink': {
              '0%, 50%': {
                opacity: 1,
              },
              '51%, 100%': {
                opacity: 0,
              },
            },
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '12px',
                background: 'rgba(20, 20, 32, 0.8)',
                border: '2px solid rgba(255, 0, 128, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 0 20px rgba(255, 0, 128, 0.5), inset 0 0 20px rgba(255, 0, 128, 0.1)',
              }}
            >
              <WorkIcon
                sx={{
                  color: '#ff0080',
                  fontSize: 40,
                  filter: 'drop-shadow(0 0 10px rgba(255, 0, 128, 0.8))',
                }}
              />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Orbitron", "Rajdhani", "Russo One", monospace, sans-serif',
                fontWeight: 800,
                color: '#e0e0ff',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                textShadow: '0 0 20px rgba(255, 0, 128, 0.8), 0 0 40px rgba(255, 0, 128, 0.4)',
                mb: 1,
              }}
            >
              Sign Up
            </Typography>
            <Typography
              sx={{
                color: '#a0a0cc',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
              }}
            >
              Initialize your workspace / Access granted
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: '8px',
                background: 'rgba(255, 0, 0, 0.1)',
                border: '1px solid rgba(255, 0, 0, 0.3)',
                color: '#ff6b6b',
                '& .MuiAlert-icon': {
                  color: '#ff6b6b',
                },
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(10, 10, 20, 0.6)',
                      color: '#e0e0ff',
                      fontFamily: 'monospace',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: 'rgba(255, 0, 128, 0.3)',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 0, 128, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff0080',
                        boxShadow: '0 0 15px rgba(255, 0, 128, 0.5)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#a0a0cc',
                      fontFamily: 'monospace',
                      '&.Mui-focused': {
                        color: '#ff0080',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(10, 10, 20, 0.6)',
                      color: '#e0e0ff',
                      fontFamily: 'monospace',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: 'rgba(255, 0, 128, 0.3)',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 0, 128, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff0080',
                        boxShadow: '0 0 15px rgba(255, 0, 128, 0.5)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#a0a0cc',
                      fontFamily: 'monospace',
                      '&.Mui-focused': {
                        color: '#ff0080',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(10, 10, 20, 0.6)',
                  color: '#e0e0ff',
                  fontFamily: 'monospace',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 0, 128, 0.3)',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 0, 128, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff0080',
                    boxShadow: '0 0 15px rgba(255, 0, 128, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#a0a0cc',
                  fontFamily: 'monospace',
                  '&.Mui-focused': {
                    color: '#ff0080',
                  },
                },
              }}
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(10, 10, 20, 0.6)',
                  color: '#e0e0ff',
                  fontFamily: 'monospace',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 0, 128, 0.3)',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 0, 128, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff0080',
                    boxShadow: '0 0 15px rgba(255, 0, 128, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#a0a0cc',
                  fontFamily: 'monospace',
                  '&.Mui-focused': {
                    color: '#ff0080',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#a0a0cc',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                },
              }}
              value={formData.password}
              onChange={handleChange}
              helperText="Use 8+ characters with a mix of letters and numbers"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{
                        color: '#a0a0cc',
                        '&:hover': {
                          color: '#ff0080',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.05rem',
                borderRadius: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: '"Orbitron", "Rajdhani", monospace, sans-serif',
                background: '#ff0080',
                color: '#fff',
                border: '2px solid #ff0080',
                boxShadow: '0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(255, 0, 128, 0.3), inset 0 0 10px rgba(255, 0, 128, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#ff1a8c',
                  boxShadow: '0 0 30px rgba(255, 0, 128, 0.7), 0 0 60px rgba(255, 0, 128, 0.5), inset 0 0 20px rgba(255, 0, 128, 0.3)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'rgba(255, 0, 128, 0.3)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  border: '2px solid rgba(255, 0, 128, 0.3)',
                },
              }}
            >
              {loading ? 'Initializing...' : 'Create Account'}
            </Button>

            <Typography
              sx={{
                textAlign: 'center',
                mt: 3,
                color: '#a0a0cc',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
              }}
            >
              Already have an account?{' '}
              <Typography
                component="span"
                sx={{
                  fontWeight: 700,
                  color: '#00ffff',
                  cursor: 'pointer',
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5)',
                    color: '#33ffff',
                  },
                }}
                onClick={() => navigate('/login')}
              >
                Log in here
              </Typography>
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Signup;
