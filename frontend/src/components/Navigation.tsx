import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as ApplicationsIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  WorkOff as LogoIcon,
} from '@mui/icons-material';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Applications', icon: <ApplicationsIcon />, path: '/applications' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRight: 'none',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
          <Avatar 
            sx={{ 
              background: 'rgba(255,255,255,0.2)',
              width: 50,
              height: 50,
              border: '2px solid rgba(255,255,255,0.5)'
            }}
          >
            <LogoIcon sx={{ fontSize: 30 }} />
          </Avatar>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
          JobTracker
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Smart Application Manager
        </Typography>
      </Box>

      <Divider sx={{ background: 'rgba(255,255,255,0.2)', my: 2 }} />

      {/* Menu Items */}
      <List sx={{ px: 1, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                sx={{
                  borderRadius: '12px',
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.15)',
                    transform: 'translateX(4px)',
                  },
                  pl: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ background: 'rgba(255,255,255,0.2)', my: 2 }} />

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          © 2026 JobTracker v1.0
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Navigation;
