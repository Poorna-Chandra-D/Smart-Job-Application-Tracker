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
    <Card sx={{ borderRadius: '16px', mb: 3, background: '#fff' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ background: '#667eea20', borderRadius: '12px', p: 1.5 }}>
            <Icon sx={{ color: '#667eea', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {description}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <SettingsIcon sx={{ fontSize: 40, color: '#667eea' }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a1a' }}>
              Settings
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ color: '#666' }}>
            Manage your preferences and account settings
          </Typography>
        </Box>

        {/* Success Alert */}
        {saved && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
            ✅ Settings saved successfully!
          </Alert>
        )}

        {/* Email Integration */}
        <SettingSection
          icon={MailIcon}
          title="Email Integration"
          description="Connect your email accounts for automatic application tracking"
        >
          <Stack spacing={2}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Connect your email to automatically sync job application emails.
            </Typography>
            <Button 
              variant="contained" 
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '12px',
                '&:hover': { boxShadow: '0 8px 16px rgba(102, 126, 234, 0.4)' }
              }}
            >
              Connect Gmail
            </Button>
            <Button 
              variant="outlined"
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '12px',
                borderWidth: '2px',
                '&:hover': { background: 'rgba(102, 126, 234, 0.05)' }
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
              control={<Switch defaultChecked sx={{ color: '#667eea' }} />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Interview Notifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Get notified when interview dates are scheduled
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch defaultChecked sx={{ color: '#667eea' }} />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Follow-up Reminders
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Receive reminders to follow up with companies
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch sx={{ color: '#667eea' }} />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Weekly Summary
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Get a weekly summary of your application progress
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch sx={{ color: '#667eea' }} />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Push Notifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
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
                  borderRadius: '12px',
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
                  borderRadius: '12px',
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
                  borderRadius: '12px',
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained"
                onClick={handleSave}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 700,
                  py: 1.2,
                  px: 4,
                  borderRadius: '12px',
                }}
              >
                Save Changes
              </Button>
              <Button 
                variant="outlined"
                sx={{
                  borderColor: '#ddd',
                  color: '#666',
                  fontWeight: 600,
                  py: 1.2,
                  px: 4,
                  borderRadius: '12px',
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
            <Typography variant="body2" sx={{ color: '#666' }}>
              Keep your account secure with a strong password.
            </Typography>
            <Button 
              variant="outlined"
              sx={{
                borderColor: '#f57c00',
                color: '#f57c00',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '12px',
                borderWidth: '2px',
                '&:hover': { background: 'rgba(245, 124, 0, 0.05)' }
              }}
            >
              Change Password
            </Button>
            <Button 
              variant="outlined"
              sx={{
                borderColor: '#f44336',
                color: '#f44336',
                fontWeight: 700,
                py: 1.2,
                borderRadius: '12px',
                borderWidth: '2px',
                '&:hover': { background: 'rgba(244, 67, 54, 0.05)' }
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
