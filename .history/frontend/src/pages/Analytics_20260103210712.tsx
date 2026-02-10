import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
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
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Application Status Overview
              </Typography>
              <Typography color="textSecondary">Detailed charts coming soon...</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Response Rate
              </Typography>
              <Typography variant="h5">{analytics.responseRate}%</Typography>
              <Typography color="textSecondary" variant="body2">
                Percentage of applications that received responses
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interview to Offer Ratio
              </Typography>
              <Typography variant="h5">{analytics.interviewToOfferRatio}%</Typography>
              <Typography color="textSecondary" variant="body2">
                Percentage of interviews that resulted in offers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
