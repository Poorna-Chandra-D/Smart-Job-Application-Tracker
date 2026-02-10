import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Container, LinearProgress } from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  AssignmentTurnedIn as SuccessIcon,
  ThumbUp as OfferIcon,
} from '@mui/icons-material';
import { applicationService } from '../services/api';

interface Application {
  id: number;
  status: string;
  application_date: string;
}

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState({
    responseRate: 0,
    interviewToOfferRatio: 0,
    averageDaysToInterview: 0,
    totalApplications: 0,
    replied: 0,
    interviews: 0,
    offers: 0,
  });

  useEffect(() => {
    calculateAnalytics();
  }, []);

  const calculateAnalytics = async () => {
    try {
      const response = await applicationService.getAll();
      const applications = response.data as Application[];

      const replied = applications.filter(app => 
        ['Interview Scheduled', 'Rejected', 'Offer'].includes(app.status)
      ).length;
      const responseRate = applications.length > 0 
        ? Math.round((replied / applications.length) * 100) 
        : 0;

      const interviews = applications.filter(app => app.status === 'Interview Scheduled').length;
      const offers = applications.filter(app => app.status === 'Offer').length;
      const interviewToOfferRatio = interviews > 0 
        ? Math.round((offers / interviews) * 100) 
        : 0;

      setAnalytics({
        responseRate,
        interviewToOfferRatio,
        averageDaysToInterview: 0,
        totalApplications: applications.length,
        replied,
        interviews,
        offers,
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const MetricCard = ({ icon: Icon, label, value, unit, bgColor, details }: any) => (
    <Card sx={{ borderRadius: '16px', h: '100%', background: '#fff', border: `2px solid ${bgColor}20` }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ background: bgColor + '20', borderRadius: '12px', p: 1.5 }}>
            <Icon sx={{ color: bgColor, fontSize: 28 }} />
          </Box>
          <TrendingIcon sx={{ color: '#4caf50', fontSize: 20 }} />
        </Box>
        <Typography color="textSecondary" sx={{ fontSize: '0.9rem', mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: bgColor, mb: 1 }}>
          {value}{unit}
        </Typography>
        {details && (
          <Typography variant="caption" sx={{ color: '#999' }}>
            {details}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1a1a1a' }}>
            📊 Analytics
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666' }}>
            Track your job application performance and success metrics
          </Typography>
        </Box>

        {/* Main Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={SuccessIcon}
              label="Response Rate"
              value={analytics.responseRate}
              unit="%"
              color="#667eea"
              bgColor="#667eea"
              details={`${analytics.replied} out of ${analytics.totalApplications} applications`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={OfferIcon}
              label="Interview to Offer"
              value={analytics.interviewToOfferRatio}
              unit="%"
              color="#f57c00"
              bgColor="#f57c00"
              details={`${analytics.offers} offers from ${analytics.interviews} interviews`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={SuccessIcon}
              label="Interviews Scheduled"
              value={analytics.interviews}
              unit=""
              color="#1976d2"
              bgColor="#1976d2"
              details="Active opportunities"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={OfferIcon}
              label="Offers Received"
              value={analytics.offers}
              unit=""
              color="#388e3c"
              bgColor="#388e3c"
              details="Pending decisions"
            />
          </Grid>
        </Grid>

        {/* Detailed Breakdown */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '16px', background: '#fff' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Application Funnel
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Total Applications</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#667eea' }}>
                      {analytics.totalApplications}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: '#667eea20',
                      '& .MuiLinearProgress-bar': { background: '#667eea', borderRadius: 4 }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Received Response</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1976d2' }}>
                      {analytics.replied}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={analytics.totalApplications > 0 ? (analytics.replied / analytics.totalApplications) * 100 : 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: '#1976d220',
                      '& .MuiLinearProgress-bar': { background: '#1976d2', borderRadius: 4 }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Interviews Scheduled</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#f57c00' }}>
                      {analytics.interviews}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={analytics.replied > 0 ? (analytics.interviews / analytics.replied) * 100 : 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: '#f5 7c0020',
                      '& .MuiLinearProgress-bar': { background: '#f57c00', borderRadius: 4 }
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Offers Received</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#388e3c' }}>
                      {analytics.offers}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={analytics.interviews > 0 ? (analytics.offers / analytics.interviews) * 100 : 0}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: '#388e3c20',
                      '& .MuiLinearProgress-bar': { background: '#388e3c', borderRadius: 4 }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '16px', background: '#fff' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  💡 Insights
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  <li style={{ marginBottom: '12px', color: '#666', lineHeight: 1.6 }}>
                    Your response rate is <strong>{analytics.responseRate}%</strong> - {analytics.responseRate > 70 ? '✨ Excellent!' : analytics.responseRate > 50 ? '👍 Good' : '📈 Keep applying'}
                  </li>
                  <li style={{ marginBottom: '12px', color: '#666', lineHeight: 1.6 }}>
                    You have <strong>{analytics.interviews}</strong> interview(s) scheduled - Make them count!
                  </li>
                  <li style={{ marginBottom: '12px', color: '#666', lineHeight: 1.6 }}>
                    Interview to offer ratio: <strong>{analytics.interviewToOfferRatio}%</strong> - {analytics.interviewToOfferRatio > 0 ? '🎉 Great job!' : '🚀 Keep working on it'}
                  </li>
                  <li style={{ marginBottom: '12px', color: '#666', lineHeight: 1.6 }}>
                    Stay consistent with applications and follow-ups for better results
                  </li>
                  <li style={{ color: '#666', lineHeight: 1.6 }}>
                    Track your progress and celebrate small wins! 🎯
                  </li>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Analytics;
