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
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
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
        background: 'linear-gradient(120deg, #1d1b2f 0%, #31295c 40%, #52358f 100%)',
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
            borderRadius: '28px',
            background: 'rgba(255,255,255,0.98)',
            boxShadow: '0 40px 80px rgba(9, 5, 32, 0.4)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '22px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <WorkIcon sx={{ color: '#fff', fontSize: 40 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1f1d42' }}>
              Create your JobTracker workspace
            </Typography>
            <Typography sx={{ color: '#6d6b89', mt: 1 }}>
              Collaborate with mentors, sync email, and stay interview-ready.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              sx={{ mt: 2 }}
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              sx={{ mt: 2 }}
              value={formData.password}
              onChange={handleChange}
              helperText="Use 8+ characters with a mix of letters and numbers"
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
                borderRadius: '14px',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
              }}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>

            <Typography sx={{ textAlign: 'center', mt: 3, color: '#6d6b89' }}>
              Already have an account?{' '}
              <Typography
                component="span"
                sx={{ fontWeight: 700, color: '#4f46e5', cursor: 'pointer' }}
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
