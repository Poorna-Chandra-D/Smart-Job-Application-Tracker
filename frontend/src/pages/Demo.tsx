import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InsightsIcon from '@mui/icons-material/Insights';
import TimelineIcon from '@mui/icons-material/Timeline';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';

const featureHighlights = [
  {
    icon: <MailOutlineIcon sx={{ fontSize: 36, color: '#00ffff' }} />,
    title: 'Email Sync & Parsing',
    description: 'Connect Gmail or Outlook to auto-detect job conversations and classify status updates instantly.',
  },
  {
    icon: <WorkOutlineIcon sx={{ fontSize: 36, color: '#ff00ff' }} />,
    title: 'Application HQ',
    description: 'A Kanban-inspired tracker with detailed notes, follow-ups, and document attachments in one place.',
  },
  {
    icon: <AutoGraphIcon sx={{ fontSize: 36, color: '#00ff64' }} />,
    title: 'Live Analytics',
    description: 'Forecast offers, monitor response rates, and visualize your funnel with gorgeous, real-time charts.',
  },
];

const metrics = [
  { label: 'Applications Organized', value: '1,240+', subtext: 'Auto-imported from email' },
  { label: 'Interviews Scheduled', value: '87', subtext: 'With reminders & notes' },
  { label: 'Offer Rate Boost', value: '+32%', subtext: 'After using reminders' },
];

const timelineSteps = [
  'Connect Gmail or Outlook in 2 clicks',
  'AI parses companies, roles, recruiters, and dates',
  'Track every stage on the Kanban board',
  'Plan interviews, follow-ups, and reminders',
  'Unlock analytics: funnels, conversion rates, and insights',
];

const testimonials = [
  {
    name: 'Aisha Khan',
    title: 'Product Designer',
    quote:
      'This demo convinced me instantly. The analytics and reminders helped me juggle 12 processes without missing a beat.',
  },
  {
    name: 'Leo Martins',
    title: 'Engineering Manager',
    quote:
      'Our entire grad cohort now uses JobTracker. The auto-parsing of recruiter emails is pure magic.',
  },
];

const Demo: React.FC = () => {
  const navigate = useNavigate();

  const handlePrimaryCta = () => navigate('/signup');
  const handleSecondaryCta = () => navigate('/login');

  return (
    <Box sx={{ background: 'linear-gradient(135deg, rgba(10, 10, 15, 1) 0%, rgba(20, 20, 32, 1) 100%)', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      {/* Floating "Building in Progress" Banner */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'linear-gradient(135deg, rgba(255, 0, 100, 0.9) 0%, rgba(255, 0, 255, 0.9) 100%)',
          color: '#fff',
          px: 3,
          py: 1.2,
          border: '2px solid #ff0064',
          borderRadius: '50px',
          boxShadow: '0 0 30px rgba(255, 0, 100, 0.5)',
          backdropFilter: 'blur(10px)',
          fontWeight: 700,
          fontSize: '0.95rem',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1,
              transform: 'translateX(-50%) scale(1)',
            },
            '50%': {
              opacity: 0.9,
              transform: 'translateX(-50%) scale(1.02)',
            },
          },
        }}
      >
        Building in Progress
      </Box>

      <Container maxWidth="lg">
        {/* Hero */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Chip
              label="THE MODERN WAY TO TRACK APPLICATIONS"
              sx={{
                mb: 3,
                fontWeight: 700,
                background: 'rgba(0, 255, 255, 0.2)',
                color: '#00ffff',
                border: '1px solid #00ffff',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.1,
                color: '#e0e0ff',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                textShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              }}
            >
              Showcase your entire job search in one immersive dashboard.
            </Typography>
            <Typography variant="h6" sx={{ color: '#a0a0cc', mb: 4, maxWidth: 520 }}>
              Watch Smart Job Application Tracker read your inbox, build a living pipeline, and send you the right
              prompts at the perfect time so you can focus on interviews, not spreadsheets.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
              <Button
                variant="contained"
                onClick={handlePrimaryCta}
                endIcon={<LaunchIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: '14px',
                  background: 'rgba(0, 255, 255, 0.2)',
                  color: '#00ffff',
                  border: '2px solid #00ffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)',
                  '&:hover': {
                    background: 'rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 35px rgba(0, 255, 255, 0.7)',
                  }
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                onClick={handleSecondaryCta}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: '14px',
                  borderWidth: 2,
                  color: '#ff00ff',
                  borderColor: '#ff00ff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(255, 0, 255, 0.1)',
                    borderColor: '#ff00ff',
                    boxShadow: '0 0 30px rgba(255, 0, 255, 0.5)',
                  }
                }}
              >
                Login to Continue
              </Button>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ color: '#a0a0cc', fontSize: '0.9rem' }}>
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#00ffff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Credentials</Typography>
                <Typography>Email: demo@jobtracker.com</Typography>
                <Typography>Password: demo123!</Typography>
              </Box>
              <Divider flexItem orientation="vertical" sx={{ borderColor: 'rgba(0, 255, 255, 0.3)' }} />
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#ff00ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>No card required</Typography>
                <Typography>Sign up or jump in with the demo account.</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                background: 'rgba(20, 20, 32, 0.9)',
                borderRadius: '28px',
                p: 3,
                border: '2px solid #00ffff',
                boxShadow: '0 0 40px rgba(0, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', color: '#00ffff', fontWeight: 700, letterSpacing: '0.1em' }}>
                Live Snapshot
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, mb: 3, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Weekly pipeline forecast
              </Typography>
              <Grid container spacing={2}>
                {metrics.map((metric) => (
                  <Grid item xs={12} sm={6} key={metric.label}>
                    <Card sx={{
                      borderRadius: '18px',
                      background: 'rgba(10, 10, 15, 0.9)',
                      border: '1px solid #ff00ff',
                      boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
                    }}>
                      <CardContent>
                        <Typography sx={{ fontSize: '0.75rem', color: '#a0a0cc', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {metric.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, my: 1, color: '#ff00ff' }}>
                          {metric.value}
                        </Typography>
                        <Typography sx={{ color: '#a0a0cc', fontSize: '0.85rem' }}>{metric.subtext}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  label="AUTO-SYNC"
                  icon={<BoltIcon />}
                  sx={{
                    fontWeight: 700,
                    background: 'rgba(0, 255, 255, 0.2)',
                    color: '#00ffff',
                    border: '1px solid #00ffff',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                />
                <Chip
                  label="SECURE"
                  icon={<ShieldIcon />}
                  sx={{
                    fontWeight: 700,
                    background: 'rgba(255, 0, 255, 0.2)',
                    color: '#ff00ff',
                    border: '1px solid #ff00ff',
                    boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                />
                <Chip
                  label="ANALYTICS"
                  icon={<InsightsIcon />}
                  sx={{
                    fontWeight: 700,
                    background: 'rgba(0, 255, 100, 0.2)',
                    color: '#00ff64',
                    border: '1px solid #00ff64',
                    boxShadow: '0 0 10px rgba(0, 255, 100, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Features */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, textAlign: 'center', color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
            Everything hiring managers ask to see in seconds.
          </Typography>
          <Grid container spacing={3}>
            {featureHighlights.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '24px',
                    padding: 3,
                    background: 'rgba(20, 20, 32, 0.9)',
                    border: '2px solid #00ffff',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
                    }
                  }}
                >
                  <Stack spacing={2}>
                    {feature.icon}
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: '#a0a0cc' }}>{feature.description}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Timeline */}
        <Grid container spacing={4} sx={{ mt: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#e0e0ff', mb: 3, textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(255, 0, 255, 0.3)' }}>
              From inbox chaos to clarity in under 60 seconds.
            </Typography>
            <Typography sx={{ color: '#a0a0cc', mb: 3 }}>
              The product tour below mirrors what hiring teams see when you share your JobTracker workspace link.
            </Typography>
            <List>
              {timelineSteps.map((step, index) => (
                <ListItem key={step} sx={{ alignItems: 'flex-start', borderLeft: '2px solid #00ffff', pl: 2, ml: 1, mb: 2 }}>
                  <ListItemIcon>
                    <TimelineIcon sx={{ color: '#00ffff' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 800, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
                        Step {index + 1}
                      </Typography>
                    }
                    secondary={<Typography sx={{ color: '#a0a0cc' }}>{step}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: 'rgba(20, 20, 32, 0.9)',
                border: '2px solid #ff00ff',
                borderRadius: '24px',
                p: 4,
                color: '#fff',
                minHeight: 320,
                boxShadow: '0 0 40px rgba(255, 0, 255, 0.4)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 800, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Demo snapshot
              </Typography>
              <Typography sx={{ color: '#a0a0cc', mb: 3 }}>
                Slide between stages to preview actual dashboard states, analytics, and interview planning cards the
                moment you connect email.
              </Typography>
              <Stack spacing={2}>
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      background: 'rgba(0, 255, 255, 0.1)',
                      border: '1px solid #00ffff',
                      borderRadius: '16px',
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(0, 255, 255, 0.2)',
                        boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                      }
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opportunity {item}</Typography>
                      <Typography sx={{ fontSize: '0.85rem', color: '#a0a0cc' }}>
                        Recruiter follow-up scheduled · Panel interview next
                      </Typography>
                    </Box>
                    <Chip
                      label="IN PROGRESS"
                      sx={{
                        background: 'rgba(255, 0, 255, 0.2)',
                        color: '#ff00ff',
                        border: '1px solid #ff00ff',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Social Proof */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="overline" sx={{ color: '#00ffff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
            Loved by power job seekers
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={6} key={testimonial.name}>
                <Card sx={{
                  borderRadius: '24px',
                  padding: 3,
                  background: 'rgba(20, 20, 32, 0.9)',
                  border: '2px solid #ff00ff',
                  boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(255, 0, 255, 0.5)',
                  }
                }}>
                  <Stack spacing={2}>
                    <CheckCircleIcon sx={{ color: '#00ff64', fontSize: 32 }} />
                    <Typography sx={{ fontSize: '1.1rem', color: '#a0a0cc' }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Typography sx={{ fontWeight: 800, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{testimonial.name}</Typography>
                    <Typography sx={{ color: '#a0a0cc' }}>{testimonial.title}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA */}
        <Card
          sx={{
            mt: 10,
            borderRadius: '28px',
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)',
            border: '2px solid #00ffff',
            color: '#fff',
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            boxShadow: '0 0 50px rgba(0, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#e0e0ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Ready to show hiring teams the organized you?
          </Typography>
          <Typography sx={{ color: '#a0a0cc', mb: 4, fontSize: '1.05rem' }}>
            Spin up your workspace, invite mentors, and keep every application conversation at your fingertips.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={handlePrimaryCta}
              sx={{
                background: 'rgba(0, 255, 255, 0.3)',
                color: '#00ffff',
                border: '2px solid #00ffff',
                fontWeight: 800,
                px: 5,
                py: 1.5,
                borderRadius: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)',
                '&:hover': {
                  background: 'rgba(0, 255, 255, 0.4)',
                  boxShadow: '0 0 35px rgba(0, 255, 255, 0.7)',
                }
              }}
            >
              Create my workspace
            </Button>
            <Button
              variant="outlined"
              onClick={handleSecondaryCta}
              sx={{
                borderColor: '#ff00ff',
                borderWidth: 2,
                color: '#ff00ff',
                fontWeight: 700,
                px: 5,
                py: 1.5,
                borderRadius: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 0, 255, 0.1)',
                  borderColor: '#ff00ff',
                  boxShadow: '0 0 30px rgba(255, 0, 255, 0.5)',
                }
              }}
            >
              I already have an account
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default Demo;
