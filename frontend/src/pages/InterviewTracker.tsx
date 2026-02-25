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
      'Scheduled': { bg: 'rgba(0, 255, 255, 0.2)', color: '#00ffff', border: '#00ffff' },
      'Completed': { bg: 'rgba(0, 255, 100, 0.2)', color: '#00ff64', border: '#00ff64' },
      'Cancelled': { bg: 'rgba(255, 0, 100, 0.2)', color: '#ff0064', border: '#ff0064' },
      'No Show': { bg: 'rgba(255, 0, 255, 0.2)', color: '#ff00ff', border: '#ff00ff' },
    };
    return colors[status] || { bg: 'rgba(160, 160, 204, 0.2)', color: '#a0a0cc', border: '#a0a0cc' };
  };

  const getTypeIcon = (type: string) => {
    return type === 'Video Call' ? <VideoCallIcon /> : <PhoneIcon />;
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(10, 10, 15, 1) 0%, rgba(20, 20, 32, 1) 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
              Interview Tracker
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#a0a0cc', letterSpacing: '0.03em' }}>
              Schedule and track your interviews
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddInterview}
            sx={{
              background: 'rgba(0, 255, 255, 0.2)',
              color: '#00ffff',
              border: '1px solid #00ffff',
              fontWeight: 700,
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
            Schedule Interview
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              borderRadius: '16px',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #00ffff',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a0a0cc' }}>
                  Total Interviews
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#00ffff' }}>
                  {interviews.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              borderRadius: '16px',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #ff00ff',
              boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 0 30px rgba(255, 0, 255, 0.6)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a0a0cc' }}>
                  Scheduled
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ff00ff' }}>
                  {interviews.filter(i => i.status === 'Scheduled').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              borderRadius: '16px',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #00ff64',
              boxShadow: '0 0 20px rgba(0, 255, 100, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 0 30px rgba(0, 255, 100, 0.6)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a0a0cc' }}>
                  Completed
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#00ff64' }}>
                  {interviews.filter(i => i.status === 'Completed').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              borderRadius: '16px',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #00ffff',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a0a0cc' }}>
                  Upcoming
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#00ffff' }}>
                  {interviews.filter(i => new Date(i.date) > new Date() && i.status === 'Scheduled').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Interviews Table */}
        {interviews.length === 0 ? (
          <Card sx={{
            borderRadius: '16px',
            p: 4,
            textAlign: 'center',
            background: 'rgba(20, 20, 32, 0.9)',
            border: '2px solid #00ffff',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
          }}>
            <DateRangeIcon sx={{ fontSize: 60, color: '#00ffff', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1, color: '#e0e0ff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              No interviews scheduled
            </Typography>
            <Typography sx={{ mb: 3, color: '#a0a0cc' }}>
              Start by scheduling your first interview
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddInterview}
              sx={{
                background: 'rgba(0, 255, 255, 0.2)',
                color: '#00ffff',
                border: '1px solid #00ffff',
                fontWeight: 700,
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
              Schedule Your First Interview
            </Button>
          </Card>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '16px',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #ff00ff',
              boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)' }}>
                  <TableCell sx={{ color: '#e0e0ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #00ffff' }}>Company</TableCell>
                  <TableCell sx={{ color: '#e0e0ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #00ffff' }}>Round</TableCell>
                  <TableCell sx={{ color: '#e0e0ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #00ffff' }}>Date & Time</TableCell>
                  <TableCell sx={{ color: '#e0e0ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #00ffff' }}>Type</TableCell>
                  <TableCell sx={{ color: '#e0e0ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #00ffff' }}>Status</TableCell>
                  <TableCell sx={{ color: '#e0e0ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #00ffff' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow
                    key={interview.id}
                    sx={{
                      '&:hover': { background: 'rgba(0, 255, 255, 0.1)' },
                      borderBottom: '1px solid rgba(0, 255, 255, 0.2)'
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, borderBottom: '1px solid rgba(0, 255, 255, 0.2)' }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: '#e0e0ff' }}>
                          {interview.company}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#a0a0cc' }}>
                          {interview.jobTitle}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#e0e0ff', borderBottom: '1px solid rgba(0, 255, 255, 0.2)' }}>
                      {interview.round}
                    </TableCell>
                    <TableCell sx={{ color: '#a0a0cc', borderBottom: '1px solid rgba(0, 255, 255, 0.2)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <DateRangeIcon sx={{ fontSize: 16, color: '#00ffff' }} />
                        {new Date(interview.date).toLocaleDateString()}
                      </Box>
                      {interview.time && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#a0a0cc' }}>
                          <ScheduleIcon sx={{ fontSize: 16, color: '#ff00ff' }} />
                          {interview.time}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(0, 255, 255, 0.2)' }}>
                      <Chip
                        size="small"
                        label={interview.type}
                        icon={getTypeIcon(interview.type) as any}
                        sx={{
                          background: 'rgba(255, 0, 255, 0.2)',
                          color: '#ff00ff',
                          border: '1px solid #ff00ff',
                          fontWeight: 600,
                          boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(0, 255, 255, 0.2)' }}>
                      <Chip
                        size="small"
                        label={interview.status}
                        sx={{
                          background: getStatusColor(interview.status).bg,
                          color: getStatusColor(interview.status).color,
                          border: `1px solid ${getStatusColor(interview.status).border}`,
                          fontWeight: 600,
                          boxShadow: `0 0 10px ${getStatusColor(interview.status).border}40`,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid rgba(0, 255, 255, 0.2)' }}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(interview)}
                          sx={{
                            color: '#00ffff',
                            '&:hover': {
                              background: 'rgba(0, 255, 255, 0.2)',
                              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(interview.id)}
                          sx={{
                            color: '#ff0064',
                            '&:hover': {
                              background: 'rgba(255, 0, 100, 0.2)',
                              boxShadow: '0 0 10px rgba(255, 0, 100, 0.5)',
                            }
                          }}
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
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(20, 20, 32, 0.95)',
            border: '2px solid #00ffff',
            borderRadius: '16px',
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)',
          color: '#e0e0ff',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: '1px solid #00ffff',
        }}>
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
            sx={{
              mb: 2,
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
            fullWidth
            label="Job Title"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            margin="dense"
            variant="outlined"
            sx={{
              mb: 2,
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
            fullWidth
            label="Round"
            value={formData.round}
            onChange={(e) => setFormData({ ...formData, round: e.target.value })}
            select
            margin="dense"
            variant="outlined"
            sx={{
              mb: 2,
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
            sx={{
              mb: 2,
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
            fullWidth
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            variant="outlined"
            sx={{
              mb: 2,
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
            fullWidth
            label="Interviewer Name"
            value={formData.interviewer}
            onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
            margin="dense"
            variant="outlined"
            sx={{
              mb: 2,
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
            fullWidth
            label="Interview Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            select
            margin="dense"
            variant="outlined"
            sx={{
              mb: 2,
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
            sx={{
              mb: 2,
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
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #00ffff' }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              color: '#a0a0cc',
              '&:hover': {
                background: 'rgba(160, 160, 204, 0.1)',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              background: 'rgba(0, 255, 255, 0.2)',
              color: '#00ffff',
              border: '1px solid #00ffff',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(0, 255, 255, 0.3)',
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)',
              }
            }}
          >
            {editingId ? 'Update' : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InterviewTracker;
