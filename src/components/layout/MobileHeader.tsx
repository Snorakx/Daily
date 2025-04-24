import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from '@mui/material';
import { Menu, Search, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Mapping of routes to their display titles
const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/tasks': 'Tasks',
  '/planner': 'Planner',
  '/pomodoro': 'Pomodoro Timer',
  '/health': 'Health Tracker',
  '/savings': 'Financial Goals',
  '/profile': 'Profile'
};

const MobileHeader = () => {
  const location = useLocation();
  const theme = useTheme();
  
  // Get current page title based on route
  const currentTitle = routeTitles[location.pathname] || 'Smart Planner';
  
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu size={20} />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {currentTitle}
        </Typography>
        
        <Box>
          <IconButton color="inherit" aria-label="search">
            <Search size={20} />
          </IconButton>
          <IconButton color="inherit" aria-label="notifications">
            <Bell size={20} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MobileHeader; 