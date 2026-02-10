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
import { API_BASE_URL } from '../services/api';

interface Application {
  id: number;
  company_name: string;
  job_title: string;
  application_date: string;
  status: string;
  created_at: string;
}

const ApplicationTracker: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddApplication = () => {
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
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/applications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            company_name: formData.companyName,
            job_title: formData.jobTitle,
            application_date: formData.applicationDate,
            status: formData.status,
          }),
        });

        if (response.ok) {
          const newApplication = await response.json();
          setApplications([...applications, newApplication]);
          alert(`Application added: ${formData.companyName} - ${formData.jobTitle}`);
          setFormData({
            companyName: '',
            jobTitle: '',
            applicationDate: '',
            status: 'Applied',
          });
          setOpenDialog(false);
        } else {
          alert('Failed to add application');
        }
      } catch (error) {
        console.error('Error adding application:', error);
        alert('Error adding application');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Application Tracker</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddApplication}
        >
          Add Application
        </Button>
      </Box>

      <Typography>Kanban board view coming soon...</Typography>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Application</DialogTitle>
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
