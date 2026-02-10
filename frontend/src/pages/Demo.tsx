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
    icon: <MailOutlineIcon sx={{ fontSize: 36, color: '#667eea' }} />,
    title: 'Email Sync & Parsing',
    description: 'Connect Gmail or Outlook to auto-detect job conversations and classify status updates instantly.',
  },
  {
    icon: <WorkOutlineIcon sx={{ fontSize: 36, color: '#764ba2' }} />,
    title: 'Application HQ',
    description: 'A Kanban-inspired tracker with detailed notes, follow-ups, and document attachments in one place.',
  },
  {
    icon: <AutoGraphIcon sx={{ fontSize: 36, color: '#e45899' }} />,
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
    <Box sx={{ background: '#f4f3ff', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Chip
              label="The modern way to track applications"
              sx={{
                mb: 3,
                fontWeight: 600,
                background: 'rgba(102, 126, 234, 0.15)',
                color: '#4b5bdc',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.1,
                color: '#1a1a1a',
              }}
            >
              Showcase your entire job search in one immersive dashboard.
            </Typography>
            <Typography variant="h6" sx={{ color: '#4a4a68', mb: 4, maxWidth: 520 }}>
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 20px 45px rgba(102, 126, 234, 0.35)',
                  textTransform: 'none',
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
                  color: '#4b5bdc',
                  borderColor: '#cdd1ff',
                  textTransform: 'none',
                }}
              >
                Login to Continue
              </Button>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ color: '#6f6c99', fontSize: '0.9rem' }}>
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#1a1a1a' }}>Demo Credentials</Typography>
                <Typography>Email: demo@jobtracker.com</Typography>
                <Typography>Password: demo123!</Typography>
              </Box>
              <Divider flexItem orientation="vertical" sx={{ borderColor: 'rgba(0,0,0,0.1)' }} />
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#1a1a1a' }}>No card required</Typography>
                <Typography>Sign up or jump in with the demo account.</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                background: 'linear-gradient(180deg, #ffffff 0%, #f6f4ff 100%)',
                borderRadius: '28px',
                p: 3,
                boxShadow: '0 30px 80px rgba(33, 35, 83, 0.2)',
                border: '1px solid rgba(255,255,255,0.6)',
              }}
            >
              <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', color: '#8c7ae6', fontWeight: 700 }}>
                Live Snapshot
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, mb: 3 }}>
                Weekly pipeline forecast
              </Typography>
              <Grid container spacing={2}>
                {metrics.map((metric) => (
                  <Grid item xs={12} sm={6} key={metric.label}>
                    <Card sx={{ borderRadius: '18px', background: '#fff', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
                      <CardContent>
                        <Typography sx={{ fontSize: '0.85rem', color: '#8c8aa7', textTransform: 'uppercase' }}>
                          {metric.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, my: 1, color: '#1a1a1a' }}>
                          {metric.value}
                        </Typography>
                        <Typography sx={{ color: '#7a7694', fontSize: '0.9rem' }}>{metric.subtext}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Chip label="Auto-sync" icon={<BoltIcon />} sx={{ fontWeight: 700 }} />
                <Chip label="Secure" icon={<ShieldIcon />} sx={{ fontWeight: 700 }} />
                <Chip label="Analytics" icon={<InsightsIcon />} sx={{ fontWeight: 700 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Features */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, textAlign: 'center', color: '#1f1c3d' }}>
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
                    background: '#fff',
                    border: '1px solid rgba(102, 126, 234, 0.15)',
                    boxShadow: '0 15px 35px rgba(31, 28, 61, 0.08)',
                  }}
                >
                  <Stack spacing={2}>
                    {feature.icon}
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f1c3d' }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: '#5d5a78' }}>{feature.description}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Timeline */}
        <Grid container spacing={4} sx={{ mt: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1f1c3d', mb: 3 }}>
              From inbox chaos to clarity in under 60 seconds.
            </Typography>
            <Typography sx={{ color: '#5d5a78', mb: 3 }}>
              The product tour below mirrors what hiring teams see when you share your JobTracker workspace link.
            </Typography>
            <List>
              {timelineSteps.map((step, index) => (
                <ListItem key={step} sx={{ alignItems: 'flex-start' }}>
                  <ListItemIcon>
                    <TimelineIcon sx={{ color: '#667eea' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 700, color: '#1f1c3d' }}>
                        Step {index + 1}
                      </Typography>
                    }
                    secondary={<Typography sx={{ color: '#5d5a78' }}>{step}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: '#1f1c3d',
                borderRadius: '24px',
                p: 4,
                color: '#fff',
                minHeight: 320,
                boxShadow: '0 25px 60px rgba(15, 12, 41, 0.5)'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Demo snapshot
              </Typography>
              <Typography sx={{ opacity: 0.85, mb: 3 }}>
                Slide between stages to preview actual dashboard states, analytics, and interview planning cards the
                moment you connect email.
              </Typography>
              <Stack spacing={2}>
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>Opportunity {item}</Typography>
                      <Typography sx={{ fontSize: '0.85rem', opacity: 0.8 }}>
                        Recruiter follow-up scheduled · Panel interview next
                      </Typography>
                    </Box>
                    <Chip label="In progress" color="secondary" />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Social Proof */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="overline" sx={{ color: '#8c7ae6', fontWeight: 700 }}>
            Loved by power job seekers
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={6} key={testimonial.name}>
                <Card sx={{ borderRadius: '24px', padding: 3, boxShadow: '0 20px 40px rgba(31, 28, 61, 0.12)' }}>
                  <Stack spacing={2}>
                    <CheckCircleIcon sx={{ color: '#22c55e', fontSize: 32 }} />
                    <Typography sx={{ fontSize: '1.1rem', color: '#4a4a68' }}>
                      “{testimonial.quote}”
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>{testimonial.name}</Typography>
                    <Typography sx={{ color: '#8b89a8' }}>{testimonial.title}</Typography>
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
            background: 'linear-gradient(135deg, #222145 0%, #5c3b94 100%)',
            color: '#fff',
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            boxShadow: '0 30px 70px rgba(13, 11, 30, 0.6)'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            Ready to show hiring teams the organized you?
          </Typography>
          <Typography sx={{ opacity: 0.9, mb: 4, fontSize: '1.05rem' }}>
            Spin up your workspace, invite mentors, and keep every application conversation at your fingertips.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={handlePrimaryCta}
              sx={{
                background: '#fff',
                color: '#4b47ff',
                fontWeight: 800,
                px: 5,
                py: 1.5,
                borderRadius: '14px',
                textTransform: 'none',
              }}
            >
              Create my workspace
            </Button>
            <Button
              variant="outlined"
              onClick={handleSecondaryCta}
              sx={{
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#fff',
                fontWeight: 700,
                px: 5,
                py: 1.5,
                borderRadius: '14px',
                textTransform: 'none',
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
