import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography, 
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Home, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Activity, 
  DollarSign, 
  User,
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import { useColorModeContext } from '../../theme.tsx';

// Sidebar width
const DRAWER_WIDTH = 260;

// Navigation items
const mainNavItems = [
  { text: 'Dashboard', icon: <Home size={20} />, path: '/' },
  { text: 'Tasks', icon: <CheckCircle size={20} />, path: '/tasks' },
  { text: 'Planner', icon: <Calendar size={20} />, path: '/planner' },
  { text: 'Pomodoro', icon: <Clock size={20} />, path: '/pomodoro' },
];

const premiumNavItems = [
  { text: 'Health', icon: <Activity size={20} />, path: '/health' },
  { text: 'Savings', icon: <DollarSign size={20} />, path: '/savings' },
];

const accountNavItems = [
  { text: 'Profile', icon: <User size={20} />, path: '/profile' },
  { text: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

const DesktopSidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleColorMode, mode } = useColorModeContext();
  
  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Check if a path is the current active path
  const isActive = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box 
          sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: 1, 
            backgroundColor: 'primary.main', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            SP
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Smart Planner
        </Typography>
      </Box>

      <Divider />

      {/* Main Navigation */}
      <List sx={{ py: 2 }}>
        {mainNavItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{ 
                mx: 1, 
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path) ? 'primary.main' : 'inherit'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      
      {/* Premium Section */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          PREMIUM FEATURES
        </Typography>
      </Box>

      <List>
        {premiumNavItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{ 
                mx: 1, 
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path) ? 'primary.main' : 'inherit'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Account Section */}
      <List>
        {accountNavItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{ 
                mx: 1, 
                borderRadius: 1,
                mb: 0.5
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Theme Toggle */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

export default DesktopSidebar; 