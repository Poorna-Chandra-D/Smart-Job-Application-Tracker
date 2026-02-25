import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
  Switch,
  FormControlLabel,
  Container,
  Divider,
  Alert,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Mail as MailIcon,
  NotificationsActive as BellIcon,
  Person as PersonIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const Settings: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const SettingSection = ({ icon: Icon, title, description, children }: any) => (
    <Card sx={{
      borderRadius: '16px',
      mb: 3,
      background: 'rgba(20, 20, 32, 0.9)',
      border: '2px solid #00ffff',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{
            background: 'rgba(0, 255, 255, 0.2)',
            border: '1px solid #00ffff',
            borderRadius: '12px',
            p: 1.5,
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
          }}>
            <Icon sx={{ color: '#00ffff', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0a0cc' }}>
              {description}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, borderColor: 'rgba(0, 255, 255, 0.2)' }} />
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(10, 10, 15, 1) 0%, rgba(20, 20, 32, 1) 100%)', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <SettingsIcon sx={{ fontSize: 40, color: '#00ffff' }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
              Settings
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ color: '#a0a0cc', letterSpacing: '0.03em' }}>
            Manage your preferences and account settings
          </Typography>
        </Box>

        {/* Success Alert */}
        {saved && (
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
            Settings saved successfully!
          </Alert>
        )}

        {/* Email Integration */}
        <SettingSection
          icon={MailIcon}
          title="Email Integration"
          description="Connect your email accounts for automatic application tracking"
        >
          <Stack spacing={2}>
            <Typography variant="body2" sx={{ color: '#a0a0cc' }}>
              Connect your email to automatically sync job application emails.
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: 'rgba(0, 255, 255, 0.2)',
                color: '#00ffff',
                border: '1px solid #00ffff',
                fontWeight: 700,
                py: 1.2,
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
              Connect Gmail
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#ff00ff',
                color: '#ff00ff',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 0, 255, 0.1)',
                  borderColor: '#ff00ff',
                  boxShadow: '0 0 25px rgba(255, 0, 255, 0.5)',
                }
              }}
            >
              Connect Outlook
            </Button>
          </Stack>
        </SettingSection>

        {/* Notifications */}
        <SettingSection
          icon={BellIcon}
          title="Notifications"
          description="Control how and when you receive notifications"
        >
          <Stack spacing={2.5}>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#00ffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#00ffff',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.03em', fontSize: '0.85rem' }}>
                    Interview Notifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0a0cc' }}>
                    Get notified when interview dates are scheduled
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#00ffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#00ffff',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.03em', fontSize: '0.85rem' }}>
                    Follow-up Reminders
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0a0cc' }}>
                    Receive reminders to follow up with companies
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#00ffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#00ffff',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.03em', fontSize: '0.85rem' }}>
                    Weekly Summary
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0a0cc' }}>
                    Get a weekly summary of your application progress
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#00ffff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#00ffff',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.03em', fontSize: '0.85rem' }}>
                    Push Notifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0a0cc' }}>
                    Send push notifications to your device
                  </Typography>
                </Box>
              }
            />
          </Stack>
        </SettingSection>

        {/* Account Settings */}
        <SettingSection
          icon={PersonIcon}
          title="Account"
          description="Update your profile information"
        >
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              fullWidth
              defaultValue="Poorna"
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
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              defaultValue="poorna@example.com"
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
            <TextField
              label="Job Title (Optional)"
              fullWidth
              placeholder="e.g., Software Engineer, Product Manager"
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  background: 'rgba(0, 255, 255, 0.2)',
                  color: '#00ffff',
                  border: '1px solid #00ffff',
                  fontWeight: 700,
                  py: 1.2,
                  px: 4,
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
                Save Changes
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#a0a0cc',
                  color: '#a0a0cc',
                  fontWeight: 600,
                  py: 1.2,
                  px: 4,
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '&:hover': {
                    background: 'rgba(160, 160, 204, 0.1)',
                    borderColor: '#a0a0cc',
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </SettingSection>

        {/* Security */}
        <SettingSection
          icon={LockIcon}
          title="Security"
          description="Manage your account security"
        >
          <Stack spacing={2}>
            <Typography variant="body2" sx={{ color: '#a0a0cc' }}>
              Keep your account secure with a strong password.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#ff00ff',
                color: '#ff00ff',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 0, 255, 0.1)',
                  borderColor: '#ff00ff',
                  boxShadow: '0 0 25px rgba(255, 0, 255, 0.5)',
                }
              }}
            >
              Change Password
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#ff0064',
                color: '#ff0064',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 0 15px rgba(255, 0, 100, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 0, 100, 0.1)',
                  borderColor: '#ff0064',
                  boxShadow: '0 0 25px rgba(255, 0, 100, 0.5)',
                }
              }}
            >
              Sign Out All Devices
            </Button>
          </Stack>
        </SettingSection>
      </Container>
    </Box>
  );
};

export default Settings;
