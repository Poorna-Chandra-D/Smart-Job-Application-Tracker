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
          background: 'linear-gradient(180deg, #0a0a0f 0%, #141420 50%, #1a1a2e 100%)',
          color: '#e0e0ff',
          borderRight: '2px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '2px 0 20px rgba(0, 255, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '2px',
            height: '100%',
            background: 'linear-gradient(180deg, transparent, #00ffff, #ff00ff, transparent)',
            animation: 'borderFlow 3s linear infinite',
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, textAlign: 'center', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
          <Avatar
            sx={{
              background: 'rgba(0, 255, 255, 0.1)',
              width: 50,
              height: 50,
              border: '2px solid #00ffff',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 10px rgba(0, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <LogoIcon sx={{ fontSize: 30, color: '#00ffff' }} />
          </Avatar>
        </Box>
        <Typography variant="h5" sx={{
          fontWeight: 800,
          mb: 0.5,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#00ffff',
          textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
        }}>
          JobTracker
        </Typography>
        <Typography variant="caption" sx={{
          color: '#ff00ff',
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600,
        }}>
          ◢ Smart Application Manager ◣
        </Typography>
      </Box>

      <Divider sx={{ background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent)', my: 2, height: '2px' }} />

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
                  borderRadius: '8px',
                  background: isActive ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
                  color: isActive ? '#00ffff' : '#a0a0cc',
                  transition: 'all 0.3s ease',
                  backdropFilter: isActive ? 'blur(10px)' : 'none',
                  borderLeft: isActive ? '3px solid #00ffff' : '3px solid transparent',
                  borderRight: '1px solid transparent',
                  boxShadow: isActive ? 'inset 0 0 20px rgba(0, 255, 255, 0.2), 0 0 10px rgba(0, 255, 255, 0.3)' : 'none',
                  pl: isActive ? 1.7 : 2,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'rgba(255, 0, 255, 0.1)',
                    color: '#ff00ff',
                    transform: 'translateX(4px)',
                    borderRight: '1px solid rgba(255, 0, 255, 0.5)',
                    boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
                  },
                  '&::before': isActive ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)',
                    animation: 'shimmer 2s infinite',
                  } : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 40,
                    transition: 'all 0.3s ease',
                    filter: isActive ? 'drop-shadow(0 0 5px currentColor)' : 'none',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ background: 'linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.5), transparent)', my: 2, height: '2px' }} />

      {/* Profile Section */}
      <Box sx={{ p: 2, textAlign: 'center', flexShrink: 0 }}>
        <Button
          onClick={handleProfileClick}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: '#e0e0ff',
            justifyContent: 'center',
            py: 1.5,
            px: 2,
            borderRadius: '8px',
            background: 'rgba(0, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)',
            mb: 1,
            '&:hover': {
              background: 'rgba(255, 0, 255, 0.1)',
              borderColor: 'rgba(255, 0, 255, 0.5)',
              boxShadow: '0 0 15px rgba(255, 0, 255, 0.3), inset 0 0 15px rgba(255, 0, 255, 0.1)',
            },
            textTransform: 'none',
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: 'rgba(0, 255, 255, 0.2)',
              border: '2px solid #00ffff',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#00ffff',
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#00ffff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {user?.name || 'User'}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#ff00ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                background: 'rgba(20, 20, 32, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(0, 255, 255, 0.3)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                color: '#e0e0ff',
                borderRadius: '8px',
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
              color: '#e0e0ff',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(0, 255, 255, 0.2)',
                color: '#00ffff',
                boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.3)',
              },
            }}
          >
            <PersonIcon sx={{ mr: 1 }} />
            My Profile
          </MenuItem>
          <Divider sx={{ background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent)', height: '2px' }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: '#ff0055',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(255, 0, 85, 0.1)',
                boxShadow: 'inset 0 0 10px rgba(255, 0, 85, 0.2)',
              },
            }}
          >
            <LogoutIcon sx={{ mr: 1 }} />
            Sign Out
          </MenuItem>
        </Menu>

        <Typography variant="caption" sx={{
          color: 'rgba(160, 160, 204, 0.7)',
          display: 'block',
          mt: 1.5,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.65rem',
        }}>
          © 2026 JobTracker v1.0
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Navigation;
