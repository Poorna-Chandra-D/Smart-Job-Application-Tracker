import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Container, LinearProgress } from '@mui/material';
import {
  AssignmentTurnedIn as SuccessIcon,
  ThumbUp as OfferIcon,
  ShowChart as ChartIcon,
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
    <Card
      sx={{
        borderRadius: '16px',
        height: '100%',
        background: 'rgba(20, 20, 32, 0.9)',
        backdropFilter: 'blur(10px)',
        border: `2px solid ${bgColor}`,
        boxShadow: `0 0 20px ${bgColor}40, inset 0 0 20px ${bgColor}10`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 0 30px ${bgColor}60, inset 0 0 30px ${bgColor}20`,
          border: `2px solid ${bgColor}`,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              background: `${bgColor}20`,
              borderRadius: '12px',
              p: 1.5,
              border: `1px solid ${bgColor}50`,
              boxShadow: `0 0 10px ${bgColor}30`,
            }}
          >
            <Icon sx={{ color: bgColor, fontSize: 28, filter: `drop-shadow(0 0 4px ${bgColor})` }} />
          </Box>
          <ChartIcon
            sx={{
              color: bgColor,
              fontSize: 20,
              filter: `drop-shadow(0 0 4px ${bgColor})`,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.6 },
                '50%': { opacity: 1 },
              }
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: '0.75rem',
            mb: 1,
            color: '#a0a0cc',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: bgColor,
            mb: 1,
            textShadow: `0 0 20px ${bgColor}80`,
            fontFamily: '"Orbitron", "Roboto Mono", monospace',
          }}
        >
          {value}{unit}
        </Typography>
        {details && (
          <Typography
            variant="caption"
            sx={{
              color: '#a0a0cc',
              fontSize: '0.75rem',
            }}
          >
            {details}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #16213e 100%)',
        py: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              color: '#e0e0ff',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
              background: 'linear-gradient(90deg, #00ffff 0%, #ff00ff 50%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '"Orbitron", "Roboto Mono", monospace',
            }}
          >
            Analytics Dashboard
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#a0a0cc',
              letterSpacing: '1px',
              fontSize: '0.9rem',
            }}
          >
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
              bgColor="#00ffff"
              details={`${analytics.replied} out of ${analytics.totalApplications} applications`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={OfferIcon}
              label="Interview to Offer"
              value={analytics.interviewToOfferRatio}
              unit="%"
              bgColor="#ff00ff"
              details={`${analytics.offers} offers from ${analytics.interviews} interviews`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={SuccessIcon}
              label="Interviews Scheduled"
              value={analytics.interviews}
              unit=""
              bgColor="#00ff88"
              details="Active opportunities"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={OfferIcon}
              label="Offers Received"
              value={analytics.offers}
              unit=""
              bgColor="#ff0055"
              details="Pending decisions"
            />
          </Grid>
        </Grid>

        {/* Detailed Breakdown */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: '16px',
                background: 'rgba(20, 20, 32, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid #00ffff',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), inset 0 0 30px rgba(0, 255, 255, 0.2)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: '#e0e0ff',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    fontFamily: '"Orbitron", "Roboto Mono", monospace',
                  }}
                >
                  Application Funnel
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#a0a0cc', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>
                      Total Applications
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#00ffff', textShadow: '0 0 8px rgba(0, 255, 255, 0.8)' }}>
                      {analytics.totalApplications}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      background: 'rgba(0, 255, 255, 0.1)',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      boxShadow: 'inset 0 0 5px rgba(0, 255, 255, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #00ffff 0%, #00cccc 100%)',
                        borderRadius: 5,
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#a0a0cc', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>
                      Received Response
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#8888ff', textShadow: '0 0 8px rgba(136, 136, 255, 0.8)' }}>
                      {analytics.replied}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={analytics.totalApplications > 0 ? (analytics.replied / analytics.totalApplications) * 100 : 0}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      background: 'rgba(136, 136, 255, 0.1)',
                      border: '1px solid rgba(136, 136, 255, 0.3)',
                      boxShadow: 'inset 0 0 5px rgba(136, 136, 255, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #8888ff 0%, #6666dd 100%)',
                        borderRadius: 5,
                        boxShadow: '0 0 10px rgba(136, 136, 255, 0.8)',
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#a0a0cc', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>
                      Interviews Scheduled
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#ff00ff', textShadow: '0 0 8px rgba(255, 0, 255, 0.8)' }}>
                      {analytics.interviews}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={analytics.replied > 0 ? (analytics.interviews / analytics.replied) * 100 : 0}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      background: 'rgba(255, 0, 255, 0.1)',
                      border: '1px solid rgba(255, 0, 255, 0.3)',
                      boxShadow: 'inset 0 0 5px rgba(255, 0, 255, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #ff00ff 0%, #cc00cc 100%)',
                        borderRadius: 5,
                        boxShadow: '0 0 10px rgba(255, 0, 255, 0.8)',
                      }
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#a0a0cc', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>
                      Offers Received
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#00ff88', textShadow: '0 0 8px rgba(0, 255, 136, 0.8)' }}>
                      {analytics.offers}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={analytics.interviews > 0 ? (analytics.offers / analytics.interviews) * 100 : 0}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      background: 'rgba(0, 255, 136, 0.1)',
                      border: '1px solid rgba(0, 255, 136, 0.3)',
                      boxShadow: 'inset 0 0 5px rgba(0, 255, 136, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #00ff88 0%, #00cc66 100%)',
                        borderRadius: 5,
                        boxShadow: '0 0 10px rgba(0, 255, 136, 0.8)',
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: '16px',
                background: 'rgba(20, 20, 32, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid #ff00ff',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.4), inset 0 0 20px rgba(255, 0, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 0 30px rgba(255, 0, 255, 0.6), inset 0 0 30px rgba(255, 0, 255, 0.2)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: '#e0e0ff',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '0 0 10px rgba(255, 0, 255, 0.5)',
                    fontFamily: '"Orbitron", "Roboto Mono", monospace',
                  }}
                >
                  Insights
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, listStyleType: 'none' }}>
                  <Box
                    component="li"
                    sx={{
                      marginBottom: '16px',
                      color: '#a0a0cc',
                      lineHeight: 1.8,
                      paddingLeft: '20px',
                      position: 'relative',
                      fontSize: '0.9rem',
                      '&::before': {
                        content: '"▸"',
                        position: 'absolute',
                        left: 0,
                        color: '#00ffff',
                        textShadow: '0 0 8px rgba(0, 255, 255, 0.8)',
                        fontWeight: 'bold',
                      }
                    }}
                  >
                    Your response rate is <strong style={{ color: '#00ffff', textShadow: '0 0 8px rgba(0, 255, 255, 0.6)' }}>{analytics.responseRate}%</strong> - {analytics.responseRate > 70 ? 'Excellent!' : analytics.responseRate > 50 ? 'Good' : 'Keep applying'}
                  </Box>
                  <Box
                    component="li"
                    sx={{
                      marginBottom: '16px',
                      color: '#a0a0cc',
                      lineHeight: 1.8,
                      paddingLeft: '20px',
                      position: 'relative',
                      fontSize: '0.9rem',
                      '&::before': {
                        content: '"▸"',
                        position: 'absolute',
                        left: 0,
                        color: '#ff00ff',
                        textShadow: '0 0 8px rgba(255, 0, 255, 0.8)',
                        fontWeight: 'bold',
                      }
                    }}
                  >
                    You have <strong style={{ color: '#ff00ff', textShadow: '0 0 8px rgba(255, 0, 255, 0.6)' }}>{analytics.interviews}</strong> interview(s) scheduled - Make them count!
                  </Box>
                  <Box
                    component="li"
                    sx={{
                      marginBottom: '16px',
                      color: '#a0a0cc',
                      lineHeight: 1.8,
                      paddingLeft: '20px',
                      position: 'relative',
                      fontSize: '0.9rem',
                      '&::before': {
                        content: '"▸"',
                        position: 'absolute',
                        left: 0,
                        color: '#00ff88',
                        textShadow: '0 0 8px rgba(0, 255, 136, 0.8)',
                        fontWeight: 'bold',
                      }
                    }}
                  >
                    Interview to offer ratio: <strong style={{ color: '#00ff88', textShadow: '0 0 8px rgba(0, 255, 136, 0.6)' }}>{analytics.interviewToOfferRatio}%</strong> - {analytics.interviewToOfferRatio > 0 ? 'Great job!' : 'Keep working on it'}
                  </Box>
                  <Box
                    component="li"
                    sx={{
                      marginBottom: '16px',
                      color: '#a0a0cc',
                      lineHeight: 1.8,
                      paddingLeft: '20px',
                      position: 'relative',
                      fontSize: '0.9rem',
                      '&::before': {
                        content: '"▸"',
                        position: 'absolute',
                        left: 0,
                        color: '#8888ff',
                        textShadow: '0 0 8px rgba(136, 136, 255, 0.8)',
                        fontWeight: 'bold',
                      }
                    }}
                  >
                    Stay consistent with applications and follow-ups for better results
                  </Box>
                  <Box
                    component="li"
                    sx={{
                      color: '#a0a0cc',
                      lineHeight: 1.8,
                      paddingLeft: '20px',
                      position: 'relative',
                      fontSize: '0.9rem',
                      '&::before': {
                        content: '"▸"',
                        position: 'absolute',
                        left: 0,
                        color: '#ff0055',
                        textShadow: '0 0 8px rgba(255, 0, 85, 0.8)',
                        fontWeight: 'bold',
                      }
                    }}
                  >
                    Track your progress and celebrate small wins!
                  </Box>
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
