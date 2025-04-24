import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, Paper, BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme } from '@mui/material';
import { Home, CheckCircle, Calendar, Clock, Activity, DollarSign, User } from 'lucide-react';

// Import view components
import Dashboard from './views/Dashboard';
import Tasks from './views/Tasks';
import Planner from './views/Planner';
import Pomodoro from './views/Pomodoro';
import Health from './views/Health';
import Savings from './views/Savings';
import Profile from './views/Profile';

// Import layout components
import MobileHeader from './components/layout/MobileHeader';
import DesktopSidebar from './components/layout/DesktopSidebar';

const App = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Map paths to navigation indices
  const pathToIndex: Record<string, number> = {
    '/': 0,
    '/tasks': 1,
    '/planner': 2,
    '/pomodoro': 3,
    '/health': 4,
    '/savings': 5,
    '/profile': 6
  };

  // Update the bottom navigation value based on the current route
  useEffect(() => {
    const path = location.pathname;
    setValue(pathToIndex[path] || 0);
  }, [location]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {!isMobile && <DesktopSidebar />}
      
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        pb: isMobile ? 7 : 0  // Bottom padding for mobile navigation
      }}>
        {isMobile && <MobileHeader />}
        
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto',
          p: 2
        }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/health" element={<Health />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Box>
        
        {isMobile && (
          <Paper 
            sx={{ 
              position: 'fixed', 
              bottom: 0, 
              left: 0, 
              right: 0,
              zIndex: 1000,
              borderRadius: '16px 16px 0 0',
              boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
            }} 
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Home" icon={<Home size={20} />} />
              <BottomNavigationAction label="Tasks" icon={<CheckCircle size={20} />} />
              <BottomNavigationAction label="Planner" icon={<Calendar size={20} />} />
              <BottomNavigationAction label="Pomodoro" icon={<Clock size={20} />} />
              <BottomNavigationAction label="Health" icon={<Activity size={20} />} />
              <BottomNavigationAction label="Savings" icon={<DollarSign size={20} />} />
              <BottomNavigationAction label="Profile" icon={<User size={20} />} />
            </BottomNavigation>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default App;
