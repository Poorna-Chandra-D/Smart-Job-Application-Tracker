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
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as ApplicationsIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  WorkOff as LogoIcon,
  Event as InterviewIcon,
  FileDownload as ResumeIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Applications', icon: <ApplicationsIcon />, path: '/applications' },
    { text: 'Interviews', icon: <InterviewIcon />, path: '/interviews' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Resume', icon: <ResumeIcon />, path: '/resume' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, textAlign: 'center', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
          <Avatar 
            sx={{ 
              background: 'rgba(255,255,255,0.2)',
              width: 50,
              height: 50,
              border: '2px solid rgba(255,255,255,0.5)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <LogoIcon sx={{ fontSize: 30 }} />
          </Avatar>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '-0.5px' }}>
          JobTracker
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block' }}>
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
                  backdropFilter: isActive ? 'blur(10px)' : 'none',
                  borderLeft: isActive ? '3px solid #fff' : 'none',
                  pl: isActive ? 1.7 : 2,
                  '&:hover': {
                    background: 'rgba(255,255,255,0.15)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                    minWidth: 40,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.95rem',
                    letterSpacing: '-0.3px',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ background: 'rgba(255,255,255,0.2)', my: 2 }} />

      {/* Profile Section */}
      <Box sx={{ p: 2, textAlign: 'center', flexShrink: 0 }}>
        <Button
          onClick={handleProfileClick}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: '#fff',
            justifyContent: 'center',
            py: 1.5,
            px: 2,
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            mb: 1,
            '&:hover': {
              background: 'rgba(255,255,255,0.15)',
            },
            textTransform: 'none',
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: 'rgba(255,255,255,0.3)',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>
              {user?.name || 'User'}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', opacity: 0.8 }}>
              Profile
            </Typography>
          </Box>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
          slotProps={{
            paper: {
              sx: {
                background: 'rgba(30, 30, 46, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: '12px',
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              navigate('/profile');
              handleProfileClose();
            }}
            sx={{
              color: '#fff',
              '&:hover': { background: 'rgba(102, 126, 234, 0.2)' },
            }}
          >
            <PersonIcon sx={{ mr: 1 }} />
            My Profile
          </MenuItem>
          <Divider sx={{ background: 'rgba(255,255,255,0.1)' }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: '#ff6b6b',
              '&:hover': { background: 'rgba(255, 107, 107, 0.1)' },
            }}
          >
            <LogoutIcon sx={{ mr: 1 }} />
            Sign Out
          </MenuItem>
        </Menu>

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block', mt: 1.5 }}>
          © 2026 JobTracker v1.0
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Navigation;
