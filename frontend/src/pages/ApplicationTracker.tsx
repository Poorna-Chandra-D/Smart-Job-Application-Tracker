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
  Business as BusinessIcon,
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
      'Applied': { bg: 'rgba(0, 255, 255, 0.15)', color: '#00ffff', border: '#00ffff', icon: ScheduleIcon },
      'Interview Scheduled': { bg: 'rgba(255, 0, 255, 0.15)', color: '#ff00ff', border: '#ff00ff', icon: ScheduleIcon },
      'In Progress': { bg: 'rgba(255, 0, 255, 0.15)', color: '#ff00ff', border: '#ff00ff', icon: ScheduleIcon },
      'Offer': { bg: 'rgba(0, 255, 136, 0.15)', color: '#00ff88', border: '#00ff88', icon: CheckIcon },
      'Rejected': { bg: 'rgba(255, 0, 85, 0.15)', color: '#ff0055', border: '#ff0055', icon: CloseIcon },
      'Declined': { bg: 'rgba(255, 0, 85, 0.15)', color: '#ff0055', border: '#ff0055', icon: CloseIcon },
    };
    return colors[status] || { bg: 'rgba(160, 160, 204, 0.15)', color: '#a0a0cc', border: '#a0a0cc', icon: ScheduleIcon };
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
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1f 0%, #1a0a2e 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <BusinessIcon sx={{
              fontSize: 40,
              color: '#00ffff',
              filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))'
            }} />
            <Typography variant="h3" sx={{
              color: '#e0e0ff',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
            }}>
              Job Applications
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ color: '#a0a0cc' }}>
            Track and manage your job applications effortlessly
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'rgba(20, 20, 32, 0.9)',
              color: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="inherit" variant="body2" sx={{
                  opacity: 0.9,
                  mb: 1,
                  color: '#a0a0cc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.75rem'
                }}>
                  Total Applications
                </Typography>
                <Typography variant="h4" sx={{
                  color: '#00ffff',
                  fontWeight: 700,
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                }}>
                  {applications.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'rgba(20, 20, 32, 0.9)',
              color: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="inherit" variant="body2" sx={{
                  opacity: 0.9,
                  mb: 1,
                  color: '#a0a0cc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.75rem'
                }}>
                  Applied
                </Typography>
                <Typography variant="h4" sx={{
                  color: '#00ffff',
                  fontWeight: 700,
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                }}>
                  {applications.filter(a => a.status === 'Applied').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'rgba(20, 20, 32, 0.9)',
              color: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(255, 0, 255, 0.3)',
              boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="inherit" variant="body2" sx={{
                  opacity: 0.9,
                  mb: 1,
                  color: '#a0a0cc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.75rem'
                }}>
                  Interviews
                </Typography>
                <Typography variant="h4" sx={{
                  color: '#ff00ff',
                  fontWeight: 700,
                  textShadow: '0 0 10px rgba(255, 0, 255, 0.5)'
                }}>
                  {applications.filter(a => a.status === 'Interview Scheduled').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'rgba(20, 20, 32, 0.9)',
              color: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography color="inherit" variant="body2" sx={{
                  opacity: 0.9,
                  mb: 1,
                  color: '#a0a0cc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.75rem'
                }}>
                  Offers
                </Typography>
                <Typography variant="h4" sx={{
                  color: '#00ff88',
                  fontWeight: 700,
                  textShadow: '0 0 10px rgba(0, 255, 136, 0.5)'
                }}>
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
              background: '#00ffff',
              color: '#0a0a1f',
              fontWeight: 700,
              px: 3,
              py: 1.2,
              borderRadius: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              '&:hover': {
                background: '#00cccc',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.7)'
              },
              '&:disabled': {
                background: 'rgba(0, 255, 255, 0.3)',
                color: 'rgba(10, 10, 31, 0.5)'
              }
            }}
          >
            {syncing ? 'Syncing Emails...' : 'Sync Emails'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddApplication}
            sx={{
              borderColor: '#00ffff',
              color: '#00ffff',
              fontWeight: 700,
              px: 3,
              py: 1.2,
              borderRadius: '12px',
              borderWidth: '2px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(0, 255, 255, 0.1)',
                borderWidth: '2px',
                borderColor: '#00ffff',
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)'
              }
            }}
          >
            Add Application
          </Button>
        </Box>

        {/* Applications Table */}
        {applications.length === 0 ? (
          <Card sx={{
            p: 4,
            textAlign: 'center',
            background: 'rgba(20, 20, 32, 0.9)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <MailIcon sx={{
              fontSize: 60,
              color: '#00ffff',
              mb: 2,
              filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
            }} />
            <Typography variant="h5" sx={{
              mb: 1,
              color: '#e0e0ff',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              No applications yet
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3, color: '#a0a0cc' }}>
              Start by adding your first application or syncing emails to get started!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddApplication}
              sx={{
                background: '#00ffff',
                color: '#0a0a1f',
                fontWeight: 700,
                px: 3,
                py: 1.2,
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                '&:hover': {
                  background: '#00cccc',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.7)'
                }
              }}
            >
              Add First Application
            </Button>
          </Card>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              background: 'rgba(20, 20, 32, 0.9)',
              borderRadius: '16px',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              overflow: 'hidden'
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)',
                  borderBottom: '2px solid rgba(0, 255, 255, 0.5)',
                  boxShadow: '0 2px 10px rgba(0, 255, 255, 0.3)'
                }}>
                  <TableCell sx={{
                    color: '#e0e0ff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    borderBottom: 'none'
                  }}>Company</TableCell>
                  <TableCell sx={{
                    color: '#e0e0ff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    borderBottom: 'none'
                  }}>Job Title</TableCell>
                  <TableCell sx={{
                    color: '#e0e0ff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    borderBottom: 'none'
                  }}>Application Date</TableCell>
                  <TableCell sx={{
                    color: '#e0e0ff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    borderBottom: 'none'
                  }}>Status</TableCell>
                  <TableCell sx={{
                    color: '#e0e0ff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    borderBottom: 'none'
                  }}>Added Date</TableCell>
                  <TableCell sx={{
                    color: '#e0e0ff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    borderBottom: 'none'
                  }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow
                    key={app.id}
                    hover
                    sx={{
                      background: 'rgba(10, 10, 20, 0.5)',
                      borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                      '&:hover': {
                        background: 'rgba(0, 255, 255, 0.1)',
                        boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <TableCell
                      sx={{
                        cursor: app.message_body ? 'pointer' : 'default',
                        color: app.message_body ? '#00ffff' : '#e0e0ff',
                        fontWeight: app.message_body ? 600 : 500,
                        textDecoration: app.message_body ? 'underline' : 'none',
                        borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                        textShadow: app.message_body ? '0 0 8px rgba(0, 255, 255, 0.4)' : 'none',
                        '&:hover': { color: '#ff00ff' }
                      }}
                      onClick={() => handleViewMessage(app.message_body)}
                    >
                      {app.company_name}
                    </TableCell>
                    <TableCell sx={{
                      color: '#e0e0ff',
                      borderBottom: '1px solid rgba(0, 255, 255, 0.1)'
                    }}>{app.job_title}</TableCell>
                    <TableCell sx={{
                      color: '#a0a0cc',
                      borderBottom: '1px solid rgba(0, 255, 255, 0.1)'
                    }}>{new Date(app.application_date).toLocaleDateString()}</TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(0, 255, 255, 0.1)' }}>
                      {(() => {
                        const statusInfo = getStatusColor(app.status);
                        return (
                          <Chip
                            label={app.status}
                            sx={{
                              background: statusInfo.bg,
                              color: statusInfo.color,
                              border: `1px solid ${statusInfo.border}`,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              borderRadius: '8px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              boxShadow: `0 0 10px ${statusInfo.border}40`,
                              textShadow: `0 0 5px ${statusInfo.color}80`
                            }}
                            size="medium"
                          />
                        );
                      })()}
                    </TableCell>
                    <TableCell sx={{
                      color: '#a0a0cc',
                      borderBottom: '1px solid rgba(0, 255, 255, 0.1)'
                    }}>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid rgba(0, 255, 255, 0.1)' }}>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditApplication(app)}
                        sx={{
                          color: '#00ffff',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontSize: '0.75rem',
                          '&:hover': {
                            background: 'rgba(0, 255, 255, 0.1)',
                            boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                          }
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

      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(20, 20, 32, 0.95)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)',
          color: '#e0e0ff',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          borderBottom: '1px solid rgba(0, 255, 255, 0.3)'
        }}>
          {editingId ? 'Edit Application' : 'Add New Application'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
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
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e0e0ff',
                '& fieldset': {
                  borderColor: 'rgba(0, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ffff',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#a0a0cc',
                '&.Mui-focused': {
                  color: '#00ffff'
                }
              }
            }}
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
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e0e0ff',
                '& fieldset': {
                  borderColor: 'rgba(0, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ffff',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#a0a0cc',
                '&.Mui-focused': {
                  color: '#00ffff'
                }
              }
            }}
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
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e0e0ff',
                '& fieldset': {
                  borderColor: 'rgba(0, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ffff',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#a0a0cc',
                '&.Mui-focused': {
                  color: '#00ffff'
                }
              }
            }}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e0e0ff',
                '& fieldset': {
                  borderColor: 'rgba(0, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ffff',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#a0a0cc',
                '&.Mui-focused': {
                  color: '#00ffff'
                }
              },
              '& .MuiSelect-icon': {
                color: '#00ffff'
              }
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    background: 'rgba(20, 20, 32, 0.95)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    '& .MuiMenuItem-root': {
                      color: '#e0e0ff',
                      '&:hover': {
                        background: 'rgba(0, 255, 255, 0.1)'
                      },
                      '&.Mui-selected': {
                        background: 'rgba(0, 255, 255, 0.2)',
                        '&:hover': {
                          background: 'rgba(0, 255, 255, 0.25)'
                        }
                      }
                    }
                  }
                }
              }
            }}
          >
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Declined">Declined</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              color: '#a0a0cc',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              '&:hover': {
                background: 'rgba(160, 160, 204, 0.1)'
              }
            }}
          >Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: '#00ffff',
              color: '#0a0a1f',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              '&:hover': {
                background: '#00cccc',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.7)'
              }
            }}
          >
            {editingId ? 'Update' : 'Add'} Application
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={messageDialog}
        onClose={handleCloseMessageDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(20, 20, 32, 0.95)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)',
          color: '#e0e0ff',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <MailIcon sx={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))' }} />
          Email Message
        </DialogTitle>
        <DialogContent sx={{
          pt: 3,
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          maxHeight: '60vh',
          overflow: 'auto',
          background: 'rgba(10, 10, 20, 0.5)'
        }}>
          <Typography sx={{
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: '#e0e0ff'
          }}>
            {selectedMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseMessageDialog}
            variant="contained"
            sx={{
              background: '#00ffff',
              color: '#0a0a1f',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              '&:hover': {
                background: '#00cccc',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.7)'
              }
            }}
          >Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationTracker;
