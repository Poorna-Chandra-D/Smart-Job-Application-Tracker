import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
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
    inProgress: 0,
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

      const inProgress = applications.filter(app => app.status === 'In Progress').length;
      const interviews = applications.filter(app => app.status === 'Interview Scheduled').length;
      const offers = applications.filter(app => app.status === 'Offer').length;

      setStats({
        totalApplications: applications.length,
        inProgress,
        interviews,
        offers,
      });
    } catch (error) {
      console.error('Failed to fetch application stats:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Applications
              </Typography>
              <Typography variant="h5">{stats.totalApplications}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h5">{stats.inProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Interviews
              </Typography>
              <Typography variant="h5">{stats.interviews}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Offers
              </Typography>
              <Typography variant="h5">{stats.offers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
