import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { applicationService, emailService } from '../services/api';

interface Application {
  id: number;
  company_name: string;
  job_title: string;
  application_date: string;
  status: string;
  created_at: string;
  message_body?: string;
}

const ApplicationTracker: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    applicationDate: '',
    status: 'Applied',
  });

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getAll();
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const handleAddApplication = () => {
    setEditingId(null);
    setOpenDialog(true);
  };

  const handleSyncEmails = async () => {
    try {
      setSyncing(true);
      await emailService.syncEmails();
      await fetchApplications();
      alert('Email sync completed');
    } catch (error: any) {
      console.error('Failed to sync emails:', error);
      alert(`Sync failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleEditApplication = (app: Application) => {
    setEditingId(app.id);
    setFormData({
      companyName: app.company_name,
      jobTitle: app.job_title,
      applicationDate: app.application_date.slice(0, 10),
      status: app.status,
    });
    setOpenDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.companyName && formData.jobTitle && formData.applicationDate) {
      try {
        if (editingId) {
          const response = await applicationService.update(editingId, {
            company_name: formData.companyName,
            job_title: formData.jobTitle,
            application_date: formData.applicationDate,
            status: formData.status,
          });

          if (response.status === 200) {
            const updated = response.data as Application;
            setApplications(applications.map(app => app.id === updated.id ? updated : app));
            alert(`Application updated: ${formData.companyName} - ${formData.jobTitle}`);
          } else {
            alert('Failed to update application');
            return;
          }
        } else {
          const response = await applicationService.create({
            company_name: formData.companyName,
            job_title: formData.jobTitle,
            application_date: formData.applicationDate,
            status: formData.status,
          });

          if (response.status === 201 || response.status === 200) {
            const newApplication = response.data;
            setApplications([...applications, newApplication]);
            alert(`Application added: ${formData.companyName} - ${formData.jobTitle}`);
          } else {
            alert('Failed to add application');
            return;
          }
        }

        setFormData({
          companyName: '',
          jobTitle: '',
          applicationDate: '',
          status: 'Applied',
        });
        setEditingId(null);
        setOpenDialog(false);
      } catch (error: any) {
        console.error('Error saving application:', error);
        alert(`Error saving application: ${error.response?.data?.error || error.message}`);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingId(null);
    setFormData({
      companyName: '',
      jobTitle: '',
      applicationDate: '',
      status: 'Applied',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: any } = {
      'Applied': 'default',
      'Interview Scheduled': 'info',
      'In Progress': 'warning',
      'Offer': 'success',
      'Rejected': 'error',
      'Declined': 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4">Application Tracker</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSyncEmails}
            disabled={syncing}
          >
            {syncing ? 'Syncing...' : 'Sync Emails'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddApplication}
          >
            Add Application
          </Button>
        </Box>
      </Box>

      {applications.length === 0 ? (
        <Typography color="textSecondary">No applications added yet. Click "Add Application" to get started!</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#0f172a' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Company</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Job Title</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Application Date</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Added Date</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id} hover>
                  <TableCell>{app.company_name}</TableCell>
                  <TableCell>{app.job_title}</TableCell>
                  <TableCell>{new Date(app.application_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={app.status} 
                      color={getStatusColor(app.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <Button size="small" onClick={() => handleEditApplication(app)}>
                        Edit
                      </Button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Application' : 'Add New Application'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Company Name"
            type="text"
            fullWidth
            variant="outlined"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Job Title"
            type="text"
            fullWidth
            variant="outlined"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Application Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            variant="outlined"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Declined">Declined</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add Application</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationTracker;
