import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const Analytics: React.FC = () => {
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
                Applications Per Week
              </Typography>
              <Typography color="textSecondary">Chart coming soon...</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Response Rate
              </Typography>
              <Typography variant="h5">0%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interview to Offer Ratio
              </Typography>
              <Typography variant="h5">0%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
