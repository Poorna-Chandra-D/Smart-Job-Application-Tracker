import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Container,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoCallIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';

interface Interview {
  id: number;
  company: string;
  jobTitle: string;
  round: string;
  date: string;
  time: string;
  interviewer: string;
  type: string;
  status: string;
  notes: string;
  createdAt: string;
}

const InterviewTracker: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    round: 'Phone Screen',
    date: '',
    time: '',
    interviewer: '',
    type: 'Phone',
    status: 'Scheduled',
    notes: '',
  });

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('interviews');
    if (saved) {
      setInterviews(JSON.parse(saved));
    }
  }, []);

  const saveInterviews = (updated: Interview[]) => {
    localStorage.setItem('interviews', JSON.stringify(updated));
    setInterviews(updated);
  };

  const handleAddInterview = () => {
    setEditingId(null);
    setFormData({
      company: '',
      jobTitle: '',
      round: 'Phone Screen',
      date: '',
      time: '',
      interviewer: '',
      type: 'Phone',
      status: 'Scheduled',
      notes: '',
    });
    setOpenDialog(true);
  };

  const handleEdit = (interview: Interview) => {
    setEditingId(interview.id);
    setFormData({
      company: interview.company,
      jobTitle: interview.jobTitle,
      round: interview.round,
      date: interview.date,
      time: interview.time,
      interviewer: interview.interviewer,
      type: interview.type,
      status: interview.status,
      notes: interview.notes,
    });
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (editingId) {
      const updated = interviews.map(i =>
        i.id === editingId
          ? { ...i, ...formData }
          : i
      );
      saveInterviews(updated);
    } else {
      const newInterview: Interview = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      saveInterviews([...interviews, newInterview]);
    }
    setOpenDialog(false);
  };

  const handleDelete = (id: number) => {
    saveInterviews(interviews.filter(i => i.id !== id));
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: any } = {
      'Scheduled': { bg: '#e3f2fd', color: '#1976d2' },
      'Completed': { bg: '#e8f5e9', color: '#388e3c' },
      'Cancelled': { bg: '#ffebee', color: '#c62828' },
      'No Show': { bg: '#fff3e0', color: '#f57c00' },
    };
    return colors[status] || { bg: '#f5f5f5', color: '#616161' };
  };

  const getTypeIcon = (type: string) => {
    return type === 'Video Call' ? <VideoCallIcon /> : <PhoneIcon />;
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1a1a1a' }}>
              📅 Interview Tracker
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666' }}>
              Schedule and track your interviews
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddInterview}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 700,
              borderRadius: '12px',
            }}
          >
            Schedule Interview
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Interviews
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {interviews.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: '16px', background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', color: '#fff' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Scheduled
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {interviews.filter(i => i.status === 'Scheduled').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: '16px', background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)', color: '#fff' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Completed
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {interviews.filter(i => i.status === 'Completed').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: '16px', background: 'linear-gradient(135deg, #f57c00 0%, #e65100 100%)', color: '#fff' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Upcoming
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {interviews.filter(i => new Date(i.date) > new Date() && i.status === 'Scheduled').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Interviews Table */}
        {interviews.length === 0 ? (
          <Card sx={{ borderRadius: '16px', p: 4, textAlign: 'center' }}>
            <DateRangeIcon sx={{ fontSize: 60, color: '#bdbdbd', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1, color: '#424242', fontWeight: 700 }}>
              No interviews scheduled
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              Start by scheduling your first interview
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddInterview}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 700,
                borderRadius: '12px',
              }}
            >
              Schedule Your First Interview
            </Button>
          </Card>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Company</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Round</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Date & Time</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow
                    key={interview.id}
                    hover
                    sx={{ '&:hover': { background: 'rgba(102, 126, 234, 0.05)' } }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>
                          {interview.company}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {interview.jobTitle}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {interview.round}
                    </TableCell>
                    <TableCell sx={{ color: '#666' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <DateRangeIcon sx={{ fontSize: 16 }} />
                        {new Date(interview.date).toLocaleDateString()}
                      </Box>
                      {interview.time && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#999' }}>
                          <ScheduleIcon sx={{ fontSize: 16 }} />
                          {interview.time}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={interview.type}
                        icon={getTypeIcon(interview.type) as any}
                        sx={{
                          background: '#f0f4ff',
                          color: '#667eea',
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={interview.status}
                        sx={{
                          background: getStatusColor(interview.status).bg,
                          color: getStatusColor(interview.status).color,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(interview)}
                          sx={{ color: '#667eea' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(interview.id)}
                          sx={{ color: '#f44336' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 700 }}>
          {editingId ? 'Edit Interview' : 'Schedule Interview'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            margin="dense"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Job Title"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            margin="dense"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Round"
            value={formData.round}
            onChange={(e) => setFormData({ ...formData, round: e.target.value })}
            select
            margin="dense"
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="Phone Screen">Phone Screen</MenuItem>
            <MenuItem value="Technical">Technical</MenuItem>
            <MenuItem value="Behavioral">Behavioral</MenuItem>
            <MenuItem value="Final">Final</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Interviewer Name"
            value={formData.interviewer}
            onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
            margin="dense"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Interview Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            select
            margin="dense"
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Video Call">Video Call</MenuItem>
            <MenuItem value="In-Person">In-Person</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            select
            margin="dense"
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="No Show">No Show</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            multiline
            rows={3}
            margin="dense"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            {editingId ? 'Update' : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InterviewTracker;
