import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ApplicationTracker: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddApplication = () => {
    setOpenDialog(true);
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Application</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Company Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Job Title"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Application Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            variant="outlined"
            defaultValue="Applied"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ApplicationTracker;
