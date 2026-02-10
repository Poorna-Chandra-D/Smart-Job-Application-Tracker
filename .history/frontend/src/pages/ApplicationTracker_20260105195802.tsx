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
  Chip,
  Card,
  CardContent,
  Grid,
  Container
} from '@mui/material';
import { 
  Add as AddIcon,
  Sync as SyncIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  MailOutline as MailIcon,
  BusinessCenter as BusinessIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
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
      'Applied': { bg: '#e3f2fd', color: '#1976d2', icon: ScheduleIcon },
      'Interview Scheduled': { bg: '#fff3e0', color: '#f57c00', icon: ScheduleIcon },
      'In Progress': { bg: '#f3e5f5', color: '#7b1fa2', icon: ScheduleIcon },
      'Offer': { bg: '#e8f5e9', color: '#388e3c', icon: CheckIcon },
      'Rejected': { bg: '#ffebee', color: '#c62828', icon: CloseIcon },
      'Declined': { bg: '#ffebee', color: '#c62828', icon: CloseIcon },
    };
    return colors[status] || { bg: '#f5f5f5', color: '#616161', icon: ScheduleIcon };
  };

  const handleViewMessage = (message: string | undefined) => {
    if (message) {
      setSelectedMessage(message);
      setMessageDialog(true);
    }
  };

  const handleCloseMessageDialog = () => {
    setMessageDialog(false);
    setSelectedMessage('');
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      pb: 4
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <BusinessIcon sx={{ fontSize: 40, color: '#fff' }} />
            <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800 }}>
              Job Applications
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Track and manage your job applications effortlessly
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Total Applications
                </Typography>
                <Typography variant="h4" sx={{ color: '#667eea', fontWeight: 700 }}>
                  {applications.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Applied
                </Typography>
                <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 700 }}>
                  {applications.filter(a => a.status === 'Applied').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Interviews
                </Typography>
                <Typography variant="h4" sx={{ color: '#f57c00', fontWeight: 700 }}>
                  {applications.filter(a => a.status === 'Interview Scheduled').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" gutterBottom>
                  Offers
                </Typography>
                <Typography variant="h4" sx={{ color: '#388e3c', fontWeight: 700 }}>
                  {applications.filter(a => a.status === 'Offer').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<SyncIcon />}
            onClick={handleSyncEmails}
            disabled={syncing}
            sx={{
              background: '#fff',
              color: '#667eea',
              fontWeight: 700,
              px: 3,
              '&:hover': { background: 'rgba(255,255,255,0.9)' }
            }}
          >
            {syncing ? 'Syncing Emails...' : 'Sync Emails'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddApplication}
            sx={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontWeight: 700,
              px: 3,
              border: '2px solid #fff',
              '&:hover': { background: 'rgba(255,255,255,0.3)' }
            }}
          >
            Add Application
          </Button>
        </Box>

        {/* Applications Table */}
        {applications.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
            <MailIcon sx={{ fontSize: 60, color: '#bdbdbd', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1, color: '#424242' }}>
              No applications yet
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              Start by adding your first application or syncing emails to get started!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddApplication}
              sx={{ background: '#667eea' }}
            >
              Add First Application
            </Button>
          </Card>
        ) : (
          <TableContainer 
            component={Paper} 
            sx={{ 
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Company</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Job Title</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Application Date</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Status</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Added Date</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow 
                    key={app.id} 
                    hover
                    sx={{
                      '&:hover': { background: 'rgba(102, 126, 234, 0.05)' },
                      transition: 'background 0.2s'
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        cursor: app.message_body ? 'pointer' : 'default', 
                        color: app.message_body ? '#667eea' : '#333',
                        fontWeight: app.message_body ? 600 : 500,
                        textDecoration: app.message_body ? 'underline' : 'none',
                        '&:hover': { color: '#764ba2' }
                      }}
                      onClick={() => handleViewMessage(app.message_body)}
                    >
                      {app.company_name}
                    </TableCell>
                    <TableCell sx={{ color: '#555' }}>{app.job_title}</TableCell>
                    <TableCell sx={{ color: '#666' }}>{new Date(app.application_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {(() => {
                        const statusInfo = getStatusColor(app.status);
                        return (
                          <Chip 
                            label={app.status} 
                            sx={{
                              background: statusInfo.bg,
                              color: statusInfo.color,
                              fontWeight: 600,
                              fontSize: '0.85rem'
                            }}
                            size="medium"
                          />
                        );
                      })()}
                    </TableCell>
                    <TableCell sx={{ color: '#666' }}>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <Button 
                        size="small" 
                        startIcon={<EditIcon />}
                        onClick={() => handleEditApplication(app)}
                        sx={{
                          color: '#667eea',
                          fontWeight: 600,
                          '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

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

      <Dialog open={messageDialog} onClose={handleCloseMessageDialog} maxWidth="md" fullWidth>
        <DialogTitle>Email Message</DialogTitle>
        <DialogContent sx={{ pt: 2, whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxHeight: '60vh', overflow: 'auto' }}>
          {selectedMessage}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessageDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationTracker;
