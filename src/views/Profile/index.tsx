import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  Grid, 
  Switch, 
  Divider,
  Card, 
  CardContent,
  TextField,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Chip,
  IconButton,
  Stack,
  useTheme
} from '@mui/material';
import { 
  User, 
  Settings, 
  Bell, 
  Moon, 
  CreditCard, 
  Shield, 
  LogOut, 
  Edit2, 
  Star, 
  Check
} from 'lucide-react';
import styles from './Profile.module.scss';

// Sample user data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  subscription: 'Pro',
  dateJoined: 'June 2022',
};

// Subscription plans
const subscriptionPlans = [
  { 
    name: 'Free', 
    price: 0, 
    features: [
      'Task list',
      'Daily planner',
      'Basic habit tracking',
    ],
    current: userData.subscription === 'Free'
  },
  { 
    name: 'Pro', 
    price: 20, 
    features: [
      'Everything in Free',
      'AI Planner',
      'Pomodoro Timer',
      'Advanced analytics'
    ],
    current: userData.subscription === 'Pro'
  },
  { 
    name: 'Full', 
    price: 30, 
    features: [
      'Everything in Pro',
      'Health tracking',
      'Financial goals',
      'Priority support'
    ],
    current: userData.subscription === 'Full'
  }
];

// Settings sections
const settingsSections = [
  { name: 'Account', icon: <User size={20} /> },
  { name: 'Appearance', icon: <Settings size={20} /> },
  { name: 'Notifications', icon: <Bell size={20} /> },
  { name: 'Subscription', icon: <CreditCard size={20} /> },
  { name: 'Privacy', icon: <Shield size={20} /> },
];

const Profile = () => {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [activeSection, setActiveSection] = useState('Account');
  
  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
  
  // Toggle email notifications
  const handleEmailNotificationsToggle = () => {
    setEmailNotifications(!emailNotifications);
  };
  
  // Change active section
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.profileContainer}>
      <Grid container spacing={4}>
        {/* Left sidebar with user info and navigation */}
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3, 
              border: '1px solid', 
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar 
                src={userData.avatar} 
                alt={userData.name} 
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {userData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {userData.email}
              </Typography>
              <Chip 
                icon={<Star size={16} />} 
                label={userData.subscription} 
                color="primary" 
                size="small" 
                sx={{ mt: 1 }}
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {/* Settings navigation */}
            <List component="nav" sx={{ py: 0 }}>
              {settingsSections.map((section) => (
                <ListItem 
                  key={section.name} 
                  button 
                  selected={activeSection === section.name}
                  onClick={() => handleSectionChange(section.name)}
                  sx={{ 
                    mb: 0.5, 
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {section.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={section.name} 
                    primaryTypographyProps={{ 
                      fontWeight: activeSection === section.name ? 600 : 400
                    }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Button 
              variant="outlined" 
              fullWidth 
              color="error" 
              startIcon={<LogOut size={18} />}
            >
              Sign Out
            </Button>
          </Paper>
          
          <Typography variant="caption" color="text.secondary">
            Member since {userData.dateJoined}
          </Typography>
        </Grid>
        
        {/* Main content area */}
        <Grid item xs={12} md={9}>
          {/* Account Settings */}
          {activeSection === 'Account' && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  Account Settings
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Edit2 size={18} />}
                  size="small"
                >
                  Edit Profile
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    defaultValue={userData.name}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    defaultValue={userData.email}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    type="password"
                    defaultValue="********"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Timezone"
                    defaultValue="Eastern Time (US & Canada)"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">
                  Save Changes
                </Button>
              </Box>
            </Paper>
          )}
          
          {/* Appearance Settings */}
          {activeSection === 'Appearance' && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Appearance
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Customize the look and feel of your application.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Moon size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dark Mode" 
                    secondary="Use dark theme for eye comfort" 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      edge="end"
                      checked={darkMode}
                      onChange={handleDarkModeToggle}
                      inputProps={{ 'aria-labelledby': 'dark-mode-switch' }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Settings size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Compact Mode" 
                    secondary="Show more content with less spacing" 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      edge="end"
                      checked={false}
                      inputProps={{ 'aria-labelledby': 'compact-mode-switch' }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          )}
          
          {/* Notifications Settings */}
          {activeSection === 'Notifications' && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage your notification preferences.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Receive task reminders and updates via email" 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      edge="end"
                      checked={emailNotifications}
                      onChange={handleEmailNotificationsToggle}
                      inputProps={{ 'aria-labelledby': 'email-notifications-switch' }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Push Notifications" 
                    secondary="Receive alerts on your device" 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      edge="end"
                      checked={true}
                      inputProps={{ 'aria-labelledby': 'push-notifications-switch' }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Task Reminders" 
                    secondary="Get reminded before task due dates" 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      edge="end"
                      checked={true}
                      inputProps={{ 'aria-labelledby': 'task-reminders-switch' }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          )}
          
          {/* Subscription Settings */}
          {activeSection === 'Subscription' && (
            <>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Subscription Plan
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage your subscription and billing information.
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {subscriptionPlans.map((plan, index) => (
                  <Grid item xs={12} sm={6} md={4} key={plan.name}>
                    <Card 
                      elevation={0} 
                      sx={{ 
                        height: '100%',
                        border: '1px solid',
                        borderColor: plan.current ? 'primary.main' : 'divider',
                        borderRadius: 2,
                        position: 'relative',
                        overflow: 'visible',
                        bgcolor: plan.current ? 'primary.light' : 'background.paper'
                      }}
                    >
                      {plan.current && (
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: -12, 
                            left: 'calc(50% - 60px)', 
                            width: 120,
                            textAlign: 'center',
                            bgcolor: 'primary.main',
                            color: 'white',
                            borderRadius: 20,
                            py: 0.5,
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          CURRENT PLAN
                        </Box>
                      )}
                      <CardContent>
                        <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
                          {plan.name}
                        </Typography>
                        <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 2 }}>
                          ${plan.price}
                          <Typography component="span" variant="body2" color="text.secondary">
                            /month
                          </Typography>
                        </Typography>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <List dense sx={{ mb: 2 }}>
                          {plan.features.map((feature) => (
                            <ListItem key={feature} disableGutters>
                              <ListItemIcon sx={{ minWidth: 30 }}>
                                <Check size={16} color={theme.palette.primary.main} />
                              </ListItemIcon>
                              <ListItemText primary={feature} />
                            </ListItem>
                          ))}
                        </List>
                        
                        <Button 
                          variant={plan.current ? "outlined" : "contained"} 
                          color={plan.current ? "primary" : "primary"}
                          fullWidth
                          size="large"
                          disabled={plan.current}
                        >
                          {plan.current ? 'Current Plan' : `Select ${plan.name}`}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Payment Information
              </Typography>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 2
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCard size={20} style={{ marginRight: 8 }} />
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        Visa ending in 4242
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Expires 12/2025
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="outlined" size="small">
                    Change
                  </Button>
                </Stack>
              </Paper>
            </>
          )}
          
          {/* Privacy Settings */}
          {activeSection === 'Privacy' && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Privacy Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Control your privacy and data settings.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Analytics" 
                    secondary="Allow anonymous usage data collection" 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      edge="end"
                      checked={true}
                      inputProps={{ 'aria-labelledby': 'analytics-switch' }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Data Sharing" 
                    secondary="Share data with trusted partners" 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      edge="end"
                      checked={false}
                      inputProps={{ 'aria-labelledby': 'data-sharing-switch' }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Personalization" 
                    secondary="Customize content based on your habits" 
                  />
                  <ListItemSecondaryAction>
                    <Switch 
                      edge="end"
                      checked={true}
                      inputProps={{ 'aria-labelledby': 'personalization-switch' }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              
              <Box sx={{ mt: 3 }}>
                <Button variant="outlined" color="error">
                  Delete My Account
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  This action cannot be undone. All your data will be permanently deleted.
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile; 