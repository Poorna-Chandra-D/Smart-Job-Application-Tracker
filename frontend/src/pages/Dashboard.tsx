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
        background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
        border: `2px solid ${bgColor}`,
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box 
            sx={{ 
              background: bgColor,
              borderRadius: '12px',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon sx={{ fontSize: 28, color: '#fff' }} />
          </Box>
          <TrendingIcon sx={{ color: '#4caf50', fontSize: 20 }} />
        </Box>
        <Typography color="textSecondary" sx={{ fontSize: '0.9rem', mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color, mb: 2 }}>
          {value}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={Math.min((value / Math.max(stats.totalApplications, 1)) * 100, 100)}
          sx={{
            height: 6,
            borderRadius: 3,
            background: `${bgColor}20`,
            '& .MuiLinearProgress-bar': {
              background: bgColor,
              borderRadius: 3,
            }
          }}
        />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1a1a1a' }}>
            Welcome back! 👋
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666' }}>
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
              color="#667eea"
              bgColor="#667eea"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              icon={PendingIcon}
              label="Applied"
              value={stats.applied}
              color="#1976d2"
              bgColor="#1976d2"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              icon={SuccessIcon}
              label="Interviews"
              value={stats.interviews}
              color="#f57c00"
              bgColor="#f57c00"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              icon={AwardIcon}
              label="Offers"
              value={stats.offers}
              color="#388e3c"
              bgColor="#388e3c"
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
            <Box sx={{ color: '#fff' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Keep your applications organized
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                Track all your job applications, interviews, and offers in one place
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexShrink: 0 }}>
              <Button 
                variant="contained" 
                sx={{ 
                  background: '#fff',
                  color: '#667eea',
                  fontWeight: 700,
                  px: 3,
                  '&:hover': { background: 'rgba(255,255,255,0.9)' }
                }}
                component={RouterLink}
                to="/applications"
              >
                View Applications
              </Button>
              <Button 
                variant="outlined" 
                sx={{ 
                  borderColor: '#fff',
                  color: '#fff',
                  fontWeight: 700,
                  px: 3,
                  '&:hover': { background: 'rgba(255,255,255,0.1)' }
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
            <Card sx={{ borderRadius: '16px', h: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  💡 Pro Tips
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, '& li': { mb: 1, color: '#666' } }}>
                  <li>Sync emails regularly to capture new applications</li>
                  <li>Update status as you progress in the interview process</li>
                  <li>Use analytics to track your success rate</li>
                  <li>Organize applications by company for better tracking</li>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '16px', h: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  🎯 Your Goal
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                  Track your progress toward landing your dream job. Each application brings you closer to success!
                </Typography>
                <Box sx={{ background: '#f0f4ff', borderRadius: '12px', p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#667eea' }}>
                      Application Success Rate
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#667eea' }}>
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
                      background: 'rgba(102, 126, 234, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 4,
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
