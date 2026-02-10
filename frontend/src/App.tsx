import { Routes, Route, Navigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ApplicationTracker from './pages/ApplicationTracker';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import InterviewTracker from './pages/InterviewTracker';
import Demo from './pages/Demo';
import Signup from './pages/Signup';
import { subscribeToAuthChanges } from './utils/authEvents';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const syncAuthState = useCallback(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    syncAuthState();
    setLoading(false);

    const cleanupCustom = subscribeToAuthChanges(syncAuthState);
    const handleStorage = () => syncAuthState();
    window.addEventListener('storage', handleStorage);

    return () => {
      cleanupCustom?.();
      window.removeEventListener('storage', handleStorage);
    };
  }, [syncAuthState]);

  const handleAuthSuccess = () => {
    syncAuthState();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        Loading...
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/signup" element={<Signup onAuthSuccess={handleAuthSuccess} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <Navigation />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<ApplicationTracker />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/interviews" element={<InterviewTracker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
