import React from 'react';
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
} from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Email Integration
          </Typography>
          <Stack spacing={2}>
            <Button variant="contained">Connect Gmail</Button>
            <Button variant="contained">Connect Outlook</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email notifications for interviews"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Follow-up reminders"
            />
            <FormControlLabel
              control={<Switch />}
              label="Push notifications"
            />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account
          </Typography>
          <Stack spacing={2}>
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Name" fullWidth />
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
