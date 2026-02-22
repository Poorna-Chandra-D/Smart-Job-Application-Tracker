import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Container,
  LinearProgress,
  Button
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  CheckCircle as SuccessIcon,
  Schedule as PendingIcon,
  EmojiEvents as AwardIcon,
  Assignment as AppIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { applicationService } from '../services/api';

interface Application {
  id: number;
  company_name: string;
  job_title: string;
  status: string;
  application_date: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    applied: 0,
    interviews: 0,
    offers: 0,
  });

  useEffect(() => {
    fetchApplicationStats();
  }, []);

  const fetchApplicationStats = async () => {
    try {
      const response = await applicationService.getAll();
      const applications = response.data as Application[];

      const applied = applications.filter(app => app.status === 'Applied').length;
      const interviews = applications.filter(app => app.status === 'Interview Scheduled').length;
      const offers = applications.filter(app => app.status === 'Offer').length;

      setStats({
        totalApplications: applications.length,
        applied,
        interviews,
        offers,
      });
    } catch (error) {
      console.error('Failed to fetch application stats:', error);
    }
  };

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
    bgColor
  }: {
    icon: any,
    label: string,
    value: number,
    color: string,
    bgColor: string
  }) => (
    <Card
      sx={{
        background: 'rgba(20, 20, 32, 0.9)',
        border: `2px solid ${color}`,
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        boxShadow: `0 0 20px ${color}30`,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 0 30px ${color}60, 0 12px 24px rgba(0,0,0,0.5)`,
          border: `2px solid ${color}`,
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              background: `${color}20`,
              border: `1px solid ${color}`,
              borderRadius: '12px',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 15px ${color}40`
            }}
          >
            <Icon sx={{ fontSize: 28, color: color }} />
          </Box>
          <TrendingIcon sx={{ color: '#00ffff', fontSize: 20 }} />
        </Box>
        <Typography sx={{ fontSize: '0.9rem', mb: 1, color: '#a0a0cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#e0e0ff', mb: 2 }}>
          {value}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min((value / Math.max(stats.totalApplications, 1)) * 100, 100)}
          sx={{
            height: 6,
            borderRadius: 3,
            background: 'rgba(10, 10, 15, 0.6)',
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${color} 0%, ${bgColor} 100%)`,
              borderRadius: 3,
              boxShadow: `0 0 10px ${color}80`
            }
          }}
        />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(10, 10, 15, 1) 0%, rgba(20, 20, 32, 1) 100%)' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
            Welcome back!
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#a0a0cc', letterSpacing: '0.03em' }}>
            Here's your job application overview
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={AppIcon}
              label="Total Applications"
              value={stats.totalApplications}
              color="#00ffff"
              bgColor="#00ffff"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={PendingIcon}
              label="Applied"
              value={stats.applied}
              color="#ff00ff"
              bgColor="#ff00ff"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={SuccessIcon}
              label="Interviews"
              value={stats.interviews}
              color="#00ffff"
              bgColor="#00ffff"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={AwardIcon}
              label="Offers"
              value={stats.offers}
              color="#ff00ff"
              bgColor="#ff00ff"
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
          border: '2px solid #00ffff',
          borderRadius: '16px',
          p: 3,
          mb: 4,
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(255, 0, 255, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.5), 0 0 80px rgba(255, 0, 255, 0.3)',
          }
        }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Keep your applications organized
              </Typography>
              <Typography variant="body2" sx={{ color: '#a0a0cc' }}>
                Track all your job applications, interviews, and offers in one place
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexShrink: 0 }}>
              <Button
                variant="contained"
                sx={{
                  background: 'rgba(0, 255, 255, 0.2)',
                  color: '#00ffff',
                  border: '1px solid #00ffff',
                  fontWeight: 700,
                  px: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)',
                  }
                }}
                component={RouterLink}
                to="/applications"
              >
                View Applications
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#ff00ff',
                  color: '#ff00ff',
                  fontWeight: 700,
                  px: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(255, 0, 255, 0.1)',
                    borderColor: '#ff00ff',
                    boxShadow: '0 0 25px rgba(255, 0, 255, 0.5)',
                  }
                }}
                component={RouterLink}
                to="/analytics"
              >
                View Analytics
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Info Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{
              borderRadius: '16px',
              h: '100%',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #ff00ff',
              boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 0 30px rgba(255, 0, 255, 0.5)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Pro Tips
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, '& li': { mb: 1, color: '#a0a0cc' } }}>
                  <li>Sync emails regularly to capture new applications</li>
                  <li>Update status as you progress in the interview process</li>
                  <li>Use analytics to track your success rate</li>
                  <li>Organize applications by company for better tracking</li>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{
              borderRadius: '16px',
              h: '100%',
              background: 'rgba(20, 20, 32, 0.9)',
              border: '2px solid #00ffff',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Your Goal
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0cc', mb: 2 }}>
                  Track your progress toward landing your dream job. Each application brings you closer to success!
                </Typography>
                <Box sx={{
                  background: 'rgba(10, 10, 15, 0.6)',
                  border: '1px solid #00ffff',
                  borderRadius: '12px',
                  p: 2,
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#00ffff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Application Success Rate
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#00ffff' }}>
                      {stats.totalApplications > 0
                        ? Math.round(((stats.offers + stats.interviews) / stats.totalApplications) * 100)
                        : 0}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={stats.totalApplications > 0
                      ? Math.round(((stats.offers + stats.interviews) / stats.totalApplications) * 100)
                      : 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: 'rgba(0, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #00ffff 0%, #ff00ff 100%)',
                        borderRadius: 4,
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
