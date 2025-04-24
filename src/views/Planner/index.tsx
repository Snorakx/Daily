import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Grid as MuiGrid, 
  Tabs, 
  Tab, 
  Chip,
  IconButton,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme
} from '@mui/material';
import { 
  CalendarClock, 
  Clock, 
  Briefcase, 
  Home, 
  Star,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  BrainCircuit
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Planner.module.scss';

// Create typed Grid component
const Grid = MuiGrid as React.ComponentType<any>;

// Days of the week
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Sample event data
const eventData = [
  { 
    id: 1, 
    title: 'Team Meeting', 
    start: '09:00', 
    end: '10:00', 
    type: 'work',
    location: 'Conference Room A',
    day: 0
  },
  { 
    id: 2, 
    title: 'Project Planning', 
    start: '11:00', 
    end: '12:30', 
    type: 'work',
    location: 'Office',
    day: 0
  },
  { 
    id: 3, 
    title: 'Lunch with Client', 
    start: '13:00', 
    end: '14:00', 
    type: 'work',
    location: 'Downtown Café',
    day: 0
  },
  { 
    id: 4, 
    title: 'Gym Workout', 
    start: '18:00', 
    end: '19:00', 
    type: 'personal',
    location: 'Fitness Center',
    day: 0
  },
  { 
    id: 5, 
    title: 'Code Review', 
    start: '10:00', 
    end: '11:30', 
    type: 'work',
    location: 'Office',
    day: 1
  },
  { 
    id: 6, 
    title: 'Dentist Appointment', 
    start: '15:00', 
    end: '16:00', 
    type: 'personal',
    location: 'Medical Center',
    day: 2
  },
];

// Golden hours (high productivity times)
const goldenHours = [
  { day: 0, start: '09:00', end: '11:00' },
  { day: 0, start: '15:00', end: '17:00' },
  { day: 1, start: '10:00', end: '12:00' },
  { day: 2, start: '09:30', end: '11:30' },
  { day: 3, start: '14:00', end: '16:00' },
  { day: 4, start: '10:00', end: '12:00' },
];

// AI suggestions
const aiSuggestions = [
  "Schedule deep work during your golden hours (9-11 AM) for maximum productivity.",
  "Consider moving your team meeting to after lunch when everyone's energy is higher.",
  "You have a 2-hour gap between meetings. Perfect time to work on your project tasks."
];

const Planner = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [showWorkOnly, setShowWorkOnly] = useState(false);
  
  // Filter events for current day and type
  const filteredEvents = eventData.filter(event => 
    event.day === currentDay && (!showWorkOnly || event.type === 'work')
  );
  
  // Find golden hour for current day
  const todayGoldenHour = goldenHours.find(hour => hour.day === currentDay);
  
  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  
  // Navigate to previous day
  const goToPrevDay = () => {
    setCurrentDay(prevDay => (prevDay === 0 ? 6 : prevDay - 1));
  };
  
  // Navigate to next day
  const goToNextDay = () => {
    setCurrentDay(prevDay => (prevDay === 6 ? 0 : prevDay + 1));
  };
  
  // Format time ranges for display
  const formatTimeRange = (start: string, end: string) => {
    return `${start} - ${end}`;
  };
  
  // Toggle work/personal filter
  const handleToggleWorkOnly = () => {
    setShowWorkOnly(!showWorkOnly);
  };
  
  // Time blocks for timeline
  const timeBlocks = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Start at 8 AM
    return hour < 12 ? `${hour}:00 AM` : hour === 12 ? `${hour}:00 PM` : `${hour-12}:00 PM`;
  });
  
  // Check if a time is within golden hours
  const isGoldenHour = (time: string) => {
    if (!todayGoldenHour) return false;
    
    const [hour, minute] = time.split(':').map(Number);
    const timeValue = hour + minute / 60;
    
    const [startHour, startMinute] = todayGoldenHour.start.split(':').map(Number);
    const [endHour, endMinute] = todayGoldenHour.end.split(':').map(Number);
    
    const startValue = startHour + startMinute / 60;
    const endValue = endHour + endMinute / 60;
    
    return timeValue >= startValue && timeValue < endValue;
  };

  return (
    <div className={styles.plannerContainer}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Weekly Planner
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Organize your schedule and optimize your productivity
        </Typography>
      </Box>
      
      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange} 
          aria-label="planner tabs"
          centered
        >
          <Tab 
            icon={<CalendarClock size={18} />} 
            iconPosition="start" 
            label="Schedule" 
          />
          <Tab 
            icon={<Star size={18} />} 
            iconPosition="start" 
            label="Focus Times" 
          />
          <Tab 
            icon={<BrainCircuit size={18} />} 
            iconPosition="start" 
            label="Suggestions" 
          />
        </Tabs>
      </Box>
      
      {/* Day selector */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <IconButton onClick={goToPrevDay}>
          <ChevronLeft />
        </IconButton>
        
        <Typography variant="h6" fontWeight={600}>
          {WEEKDAYS[currentDay]}
        </Typography>
        
        <IconButton onClick={goToNextDay}>
          <ChevronRight />
        </IconButton>
      </Paper>
      
      {/* Work/Personal Toggle */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          control={<Switch checked={showWorkOnly} onChange={handleToggleWorkOnly} />}
          label={
            <Stack direction="row" spacing={1} alignItems="center">
              {showWorkOnly ? <Briefcase size={18} /> : <Home size={18} />}
              <Typography variant="body2">{showWorkOnly ? 'Work Only' : 'All Events'}</Typography>
            </Stack>
          }
        />
      </Box>
      
      {/* Schedule Tab Content */}
      {currentTab === 0 && (
        <>
          {/* Timeline */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <Box sx={{ position: 'relative', pl: 5, pr: 2 }}>
              {/* Time markers */}
              {timeBlocks.map((time, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    borderTop: index > 0 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    py: 1.5,
                    position: 'relative',
                    backgroundColor: isGoldenHour(time.split(' ')[0]) ? 'rgba(255, 193, 7, 0.1)' : 'transparent'
                  }}
                >
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                      position: 'absolute', 
                      left: -40, 
                      top: 8,
                      width: 35,
                      textAlign: 'right'
                    }}
                  >
                    {time}
                  </Typography>
                  
                  {isGoldenHour(time.split(' ')[0]) && (
                    <Chip 
                      size="small"
                      icon={<Star size={14} />}
                      label="Golden Hour"
                      sx={{ 
                        position: 'absolute',
                        right: 0,
                        top: 6,
                        backgroundColor: 'rgba(255, 193, 7, 0.2)',
                        borderColor: theme.palette.warning.main,
                        color: theme.palette.warning.dark,
                        border: '1px solid'
                      }}
                    />
                  )}
                </Box>
              ))}
              
              {/* Event blocks */}
              {filteredEvents.map((event) => {
                // Calculate position based on start time
                const [startHour, startMinute] = event.start.split(':').map(Number);
                const [endHour, endMinute] = event.end.split(':').map(Number);
                
                const startPos = (startHour - 8) * 48 + startMinute * 0.8; // Each hour is ~48px
                const duration = ((endHour - startHour) * 60 + (endMinute - startMinute)) * 0.8;
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      top: `${startPos}px`,
                      left: '50px',
                      right: '30px',
                      height: `${duration}px`,
                      zIndex: 10
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        height: '100%',
                        p: 1,
                        borderLeft: '4px solid',
                        borderColor: event.type === 'work' ? 'primary.main' : 'secondary.main',
                        backgroundColor: event.type === 'work' ? 'primary.light' : 'secondary.light',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 1
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {event.title}
                        </Typography>
                        <IconButton size="small">
                          <MoreVertical size={16} />
                        </IconButton>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                        <Clock size={14} style={{ marginRight: 4 }} />
                        <Typography variant="caption" color="text.secondary">
                          {formatTimeRange(event.start, event.end)}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                );
              })}
            </Box>
          </Paper>
        </>
      )}
      
      {/* Focus Times Tab Content */}
      {currentTab === 1 && (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Your Productivity Pattern
            </Typography>
            
            <Typography variant="body2" color="text.secondary" paragraph>
              Based on your past activity, we've identified your most productive hours.
              Plan your important tasks during these "golden hours" for maximum focus.
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                Golden Hours for {WEEKDAYS[currentDay]}:
              </Typography>
              
              {todayGoldenHour ? (
                <Chip 
                  icon={<Star size={16} />} 
                  label={formatTimeRange(todayGoldenHour.start, todayGoldenHour.end)} 
                  color="warning" 
                  variant="outlined" 
                  sx={{ fontWeight: 500 }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No golden hours identified for this day yet.
                </Typography>
              )}
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Weekly Pattern:
            </Typography>
            
            <Grid container spacing={2}>
              {WEEKDAYS.map((day, index) => {
                const dayGoldenHour = goldenHours.find(hour => hour.day === index);
                
                return (
                  <Grid item xs={12} sm={6} key={day}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ width: 100 }}>
                        {day}:
                      </Typography>
                      {dayGoldenHour ? (
                        <Chip 
                          size="small"
                          label={formatTimeRange(dayGoldenHour.start, dayGoldenHour.end)} 
                          color={index === currentDay ? 'warning' : 'default'} 
                          variant={index === currentDay ? 'filled' : 'outlined'} 
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Not enough data
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* Suggestions Tab Content */}
      {currentTab === 2 && (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BrainCircuit size={24} color={theme.palette.primary.main} style={{ marginRight: 8 }} />
              <Typography variant="h6" fontWeight={600}>
                AI Suggestions
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" paragraph>
              These personalized suggestions are based on your schedule, productivity patterns, and best practices.
            </Typography>
            
            <List>
              {aiSuggestions.map((suggestion, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem alignItems="flex-start">
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Star size={20} color={theme.palette.warning.main} />
                    </ListItemIcon>
                    <ListItemText primary={suggestion} />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Planner; 