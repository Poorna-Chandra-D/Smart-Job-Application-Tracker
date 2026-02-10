import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ApplicationTracker from './pages/ApplicationTracker';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<ApplicationTracker />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
