import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ApplicationTracker from './pages/ApplicationTracker';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <Navigation />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<ApplicationTracker />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
