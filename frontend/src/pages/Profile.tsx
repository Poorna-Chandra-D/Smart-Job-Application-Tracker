import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Grid,
  Container,
  Divider,
  Alert,
  Stack,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/FileDownload';
import LinkIcon from '@mui/icons-material/Link';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    bio: '',
    linkedin: '',
    github: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setFormData({
        name: parsed.name || '',
        email: parsed.email || '',
        phone: parsed.phone || '',
        location: parsed.location || '',
        jobTitle: parsed.jobTitle || '',
        bio: parsed.bio || '',
        linkedin: parsed.linkedin || '',
        github: parsed.github || '',
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      setEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(10, 10, 15, 1) 0%, rgba(20, 20, 32, 1) 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
              My Profile
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#a0a0cc', letterSpacing: '0.03em' }}>
              Manage your account and settings
            </Typography>
          </Box>
          {!editing && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setEditing(true)}
              sx={{
                background: 'rgba(0, 255, 255, 0.2)',
                color: '#00ffff',
                border: '1px solid #00ffff',
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(0, 255, 255, 0.3)',
                  boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)',
                }
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        {/* Success Alert */}
        {success && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: '12px',
              background: 'rgba(0, 255, 100, 0.2)',
              border: '1px solid #00ff64',
              color: '#00ff64',
              '& .MuiAlert-icon': {
                color: '#00ff64',
              }
            }}
          >
            {success}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{
              borderRadius: '16px',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #00ffff',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.3) 0%, rgba(255, 0, 255, 0.3) 100%)',
                    border: '2px solid #00ffff',
                    fontSize: '3rem',
                    margin: '0 auto',
                    mb: 2,
                    color: '#00ffff',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  }}
                >
                  {formData.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {formData.name || 'User'}
                </Typography>
                {formData.jobTitle && (
                  <Typography variant="body2" sx={{ color: '#00ffff', fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {formData.jobTitle}
                  </Typography>
                )}
                <Chip
                  label="ACTIVE"
                  sx={{
                    background: 'rgba(0, 255, 100, 0.2)',
                    color: '#00ff64',
                    border: '1px solid #00ff64',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '0 0 10px rgba(0, 255, 100, 0.3)',
                  }}
                />
                <Divider sx={{ my: 3, borderColor: 'rgba(0, 255, 255, 0.2)' }} />
                <Stack spacing={1.5} sx={{ textAlign: 'left' }}>
                  {formData.email && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MailIcon sx={{ color: '#00ffff', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#a0a0cc' }}>
                        {formData.email}
                      </Typography>
                    </Box>
                  )}
                  {formData.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ color: '#00ffff', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#a0a0cc' }}>
                        {formData.phone}
                      </Typography>
                    </Box>
                  )}
                  {formData.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon sx={{ color: '#00ffff', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#a0a0cc' }}>
                        {formData.location}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {!editing && (
                  <>
                    <Divider sx={{ my: 3, borderColor: 'rgba(0, 255, 255, 0.2)' }} />
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      sx={{
                        borderColor: '#ff00ff',
                        color: '#ff00ff',
                        fontWeight: 700,
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        mb: 2,
                        boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
                        '&:hover': {
                          background: 'rgba(255, 0, 255, 0.1)',
                          borderColor: '#ff00ff',
                          boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)',
                        }
                      }}
                    >
                      Download Resume
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleLogout}
                      sx={{
                        borderColor: '#ff0064',
                        color: '#ff0064',
                        fontWeight: 700,
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: '0 0 10px rgba(255, 0, 100, 0.3)',
                        '&:hover': {
                          background: 'rgba(255, 0, 100, 0.1)',
                          borderColor: '#ff0064',
                          boxShadow: '0 0 20px rgba(255, 0, 100, 0.5)',
                        }
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Edit Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{
              borderRadius: '16px',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #ff00ff',
              boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            }}>
              <CardContent sx={{ p: 4 }}>
                {editing ? (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Edit Your Information
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#e0e0ff',
                              '& fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#a0a0cc',
                              '&.Mui-focused': {
                                color: '#00ffff',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#e0e0ff',
                              '& fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#a0a0cc',
                              '&.Mui-focused': {
                                color: '#00ffff',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#e0e0ff',
                              '& fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#a0a0cc',
                              '&.Mui-focused': {
                                color: '#00ffff',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#e0e0ff',
                              '& fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#a0a0cc',
                              '&.Mui-focused': {
                                color: '#00ffff',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Job Title (Target Position)"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#e0e0ff',
                              '& fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#a0a0cc',
                              '&.Mui-focused': {
                                color: '#00ffff',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          multiline
                          rows={3}
                          variant="outlined"
                          placeholder="Tell us about yourself..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#e0e0ff',
                              '& fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#a0a0cc',
                              '&.Mui-focused': {
                                color: '#00ffff',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="LinkedIn URL"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          variant="outlined"
                          placeholder="https://linkedin.com/in/..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#e0e0ff',
                              '& fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#a0a0cc',
                              '&.Mui-focused': {
                                color: '#00ffff',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="GitHub URL"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          variant="outlined"
                          placeholder="https://github.com/..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: '#e0e0ff',
                              '& fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&:hover fieldset': {
                                borderColor: '#00ffff',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#00ffff',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#a0a0cc',
                              '&.Mui-focused': {
                                color: '#00ffff',
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={saving}
                        sx={{
                          background: 'rgba(0, 255, 255, 0.2)',
                          color: '#00ffff',
                          border: '1px solid #00ffff',
                          fontWeight: 700,
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                          '&:hover': {
                            background: 'rgba(0, 255, 255, 0.3)',
                            boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)',
                          },
                          '&:disabled': {
                            background: 'rgba(160, 160, 204, 0.1)',
                            color: '#a0a0cc',
                            border: '1px solid #a0a0cc',
                          }
                        }}
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={() => setEditing(false)}
                        sx={{
                          borderColor: '#ff00ff',
                          color: '#ff00ff',
                          fontWeight: 700,
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
                          '&:hover': {
                            background: 'rgba(255, 0, 255, 0.1)',
                            borderColor: '#ff00ff',
                            boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)',
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Account Information
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#a0a0cc', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                          Full Name
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#e0e0ff' }}>
                          {formData.name || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#a0a0cc', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                          Email
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#e0e0ff' }}>
                          {formData.email || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#a0a0cc', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                          Phone
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#e0e0ff' }}>
                          {formData.phone || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#a0a0cc', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                          Location
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#e0e0ff' }}>
                          {formData.location || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#a0a0cc', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                          Target Job Title
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#e0e0ff' }}>
                          {formData.jobTitle || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ color: '#a0a0cc', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                          Bio
                        </Typography>
                        <Typography sx={{ fontWeight: 600, whiteSpace: 'pre-wrap', color: '#e0e0ff' }}>
                          {formData.bio || '—'}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3, borderColor: 'rgba(255, 0, 255, 0.2)' }} />

                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Social Links
                    </Typography>
                    <Stack spacing={1}>
                      {formData.linkedin ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinkIcon sx={{ color: '#00ffff', fontSize: 20 }} />
                          <Typography
                            component="a"
                            href={formData.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#00ffff',
                              textDecoration: 'none',
                              fontWeight: 600,
                              '&:hover': {
                                textDecoration: 'underline',
                                textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              },
                            }}
                          >
                            LinkedIn
                          </Typography>
                        </Box>
                      ) : (
                        <Typography sx={{ color: '#a0a0cc' }}>No LinkedIn profile</Typography>
                      )}
                      {formData.github ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinkIcon sx={{ color: '#ff00ff', fontSize: 20 }} />
                          <Typography
                            component="a"
                            href={formData.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#ff00ff',
                              textDecoration: 'none',
                              fontWeight: 600,
                              '&:hover': {
                                textDecoration: 'underline',
                                textShadow: '0 0 10px rgba(255, 0, 255, 0.5)',
                              },
                            }}
                          >
                            GitHub
                          </Typography>
                        </Box>
                      ) : (
                        <Typography sx={{ color: '#a0a0cc' }}>No GitHub profile</Typography>
                      )}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
