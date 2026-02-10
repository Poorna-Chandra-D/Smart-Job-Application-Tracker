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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  FileDownload as DownloadIcon,
  LinkOutlined as LinkIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
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
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1a1a1a' }}>
              👤 My Profile
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666' }}>
              Manage your account and settings
            </Typography>
          </Box>
          {!editing && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setEditing(true)}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 700,
                borderRadius: '12px',
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        {/* Success Alert */}
        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
            ✅ {success}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '3rem',
                    margin: '0 auto',
                    mb: 2,
                  }}
                >
                  {formData.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {formData.name || 'User'}
                </Typography>
                {formData.jobTitle && (
                  <Typography variant="body2" sx={{ color: '#667eea', fontWeight: 600, mb: 1 }}>
                    {formData.jobTitle}
                  </Typography>
                )}
                <Chip
                  label="Active"
                  color="success"
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
                <Divider sx={{ my: 3 }} />
                <Stack spacing={1.5} sx={{ textAlign: 'left' }}>
                  {formData.email && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MailIcon sx={{ color: '#667eea', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {formData.email}
                      </Typography>
                    </Box>
                  )}
                  {formData.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ color: '#667eea', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {formData.phone}
                      </Typography>
                    </Box>
                  )}
                  {formData.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon sx={{ color: '#667eea', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {formData.location}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {!editing && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      sx={{
                        borderColor: '#667eea',
                        color: '#667eea',
                        fontWeight: 700,
                        borderRadius: '12px',
                        mb: 1,
                      }}
                    >
                      Download Resume
                    </Button>
                    <Button
                      fullWidth
                      color="error"
                      onClick={handleLogout}
                      sx={{ fontWeight: 700, borderRadius: '12px' }}
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
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 4 }}>
                {editing ? (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
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
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          fontWeight: 700,
                          borderRadius: '12px',
                        }}
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={() => setEditing(false)}
                        sx={{ fontWeight: 700, borderRadius: '12px' }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                      Account Information
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#999', mb: 0.5 }}>
                          Full Name
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                          {formData.name || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#999', mb: 0.5 }}>
                          Email
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                          {formData.email || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#999', mb: 0.5 }}>
                          Phone
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                          {formData.phone || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#999', mb: 0.5 }}>
                          Location
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                          {formData.location || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#999', mb: 0.5 }}>
                          Target Job Title
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                          {formData.jobTitle || '—'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ color: '#999', mb: 0.5 }}>
                          Bio
                        </Typography>
                        <Typography sx={{ fontWeight: 600, whiteSpace: 'pre-wrap' }}>
                          {formData.bio || '—'}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      Social Links
                    </Typography>
                    <Stack spacing={1}>
                      {formData.linkedin && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinkIcon sx={{ color: '#0077b5', fontSize: 20 }} />
                          <Typography
                            component="a"
                            href={formData.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#0077b5',
                              textDecoration: 'none',
                              fontWeight: 600,
                              '&:hover': { textDecoration: 'underline' },
                            }}
                          >
                            LinkedIn
                          </Typography>
                        </Box>
                      )}
                      {formData.github && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinkIcon sx={{ color: '#333', fontSize: 20 }} />
                          <Typography
                            component="a"
                            href={formData.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#333',
                              textDecoration: 'none',
                              fontWeight: 600,
                              '&:hover': { textDecoration: 'underline' },
                            }}
                          >
                            GitHub
                          </Typography>
                        </Box>
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
