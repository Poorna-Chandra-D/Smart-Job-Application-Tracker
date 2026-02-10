import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ApplicationTracker: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    applicationDate: '',
    status: 'Applied',
  });

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

  const handleSubmit = () => {
    if (formData.companyName && formData.jobTitle && formData.applicationDate) {
      console.log('New Application:', formData);
      // TODO: Send to backend API
      alert(`Application added: ${formData.companyName} - ${formData.jobTitle}`);
      setFormData({
        companyName: '',
        jobTitle: '',
        applicationDate: '',
        status: 'Applied',
      });
      setOpenDialog(false);
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
