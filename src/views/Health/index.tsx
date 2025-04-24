import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Chip,
  Card, 
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Checkbox,
  Divider,
  LinearProgress,
  useTheme,
  IconButton,
  Stack
} from '@mui/material';
import { 
  Dumbbell, 
  Apple, 
  HeartPulse, 
  Pill, 
  CalendarCheck, 
  BarChart2, 
  PlusCircle,
  ChevronRight,
  CheckCircle2,
  Clock,
  Flame
} from 'lucide-react';
import styles from './Health.module.scss';

// Tab panel props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Tab panel component
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`health-tabpanel-${index}`}
      aria-labelledby={`health-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Tab props
const a11yProps = (index: number) => {
  return {
    id: `health-tab-${index}`,
    'aria-controls': `health-tabpanel-${index}`,
  };
};

// Sample workout data
const workoutData = [
  { 
    id: 1, 
    name: 'Full Body Workout', 
    duration: 45, 
    calories: 320,
    lastDone: '2 days ago',
    muscleGroups: ['Upper Body', 'Core', 'Legs']
  },
  { 
    id: 2, 
    name: 'Morning Cardio', 
    duration: 30, 
    calories: 280,
    lastDone: 'Yesterday',
    muscleGroups: ['Cardio']
  },
  { 
    id: 3, 
    name: 'Yoga Flow', 
    duration: 40, 
    calories: 180,
    lastDone: '4 days ago',
    muscleGroups: ['Flexibility', 'Core']
  },
];

// Sample diet data
const mealData = [
  { type: 'Breakfast', calories: 350, protein: 25, carbs: 30, fat: 15 },
  { type: 'Lunch', calories: 520, protein: 35, carbs: 45, fat: 20 },
  { type: 'Dinner', calories: 480, protein: 30, carbs: 40, fat: 18 },
  { type: 'Snacks', calories: 250, protein: 10, carbs: 25, fat: 12 },
];

// Sample habit data
const habitData = [
  { id: 1, name: 'Drink 8 glasses of water', streak: 5, completed: true },
  { id: 2, name: 'Meditate for 10 minutes', streak: 3, completed: false },
  { id: 3, name: 'Take a walk', streak: 7, completed: true },
  { id: 4, name: 'Read before bed', streak: 4, completed: false },
];

// Sample supplement data
const supplementData = [
  { id: 1, name: 'Multivitamin', dosage: '1 tablet', time: 'Morning', taken: true },
  { id: 2, name: 'Omega-3 Fish Oil', dosage: '1000mg', time: 'Morning', taken: true },
  { id: 3, name: 'Magnesium', dosage: '400mg', time: 'Evening', taken: false },
  { id: 4, name: 'Zinc', dosage: '15mg', time: 'Evening', taken: false },
];

const Health = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [habits, setHabits] = useState(habitData);
  const [supplements, setSupplements] = useState(supplementData);
  
  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Toggle habit completion
  const toggleHabitCompletion = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };
  
  // Toggle supplement taken
  const toggleSupplementTaken = (id: number) => {
    setSupplements(supplements.map(supplement => 
      supplement.id === id ? { ...supplement, taken: !supplement.taken } : supplement
    ));
  };
  
  // Calculate total nutrition
  const totalNutrition = mealData.reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  
  return (
    <div className={styles.healthContainer}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Health Tracker
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your workouts, nutrition, habits, and supplements
        </Typography>
      </Box>
      
      {/* Header Stats */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Chip 
          icon={<Flame size={16} />} 
          label="1250 kcal today" 
          color="error" 
          variant="outlined" 
        />
        <Chip 
          icon={<CalendarCheck size={16} />} 
          label="3 active streaks" 
          color="success" 
          variant="outlined" 
        />
        <Chip 
          icon={<Clock size={16} />} 
          label="120 min active this week" 
          color="primary" 
          variant="outlined" 
        />
      </Box>
      
      {/* Tabs */}
      <Paper elevation={0} sx={{ borderRadius: 2, mb: 4, border: '1px solid', borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="health tabs"
          variant="fullWidth"
          sx={{ 
            '& .MuiTabs-indicator': { 
              height: 3,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3
            }
          }}
        >
          <Tab 
            icon={<Dumbbell size={18} />} 
            iconPosition="start" 
            label="Workouts" 
            {...a11yProps(0)} 
          />
          <Tab 
            icon={<Apple size={18} />} 
            iconPosition="start" 
            label="Diet" 
            {...a11yProps(1)} 
          />
          <Tab 
            icon={<HeartPulse size={18} />} 
            iconPosition="start" 
            label="Habits" 
            {...a11yProps(2)} 
          />
          <Tab 
            icon={<Pill size={18} />} 
            iconPosition="start" 
            label="Supplements" 
            {...a11yProps(3)} 
          />
        </Tabs>
      </Paper>
      
      {/* Workouts Tab Panel */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            startIcon={<PlusCircle size={18} />}
            sx={{ borderRadius: 28 }}
          >
            Add Workout
          </Button>
        </Box>
        
        {workoutData.map((workout) => (
          <Card 
            key={workout.id} 
            elevation={0} 
            sx={{ 
              mb: 2, 
              border: '1px solid', 
              borderColor: 'divider',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" fontWeight={600}>
                  {workout.name}
                </Typography>
                <Chip 
                  size="small" 
                  label={`${workout.duration} min`} 
                  color="primary" 
                  variant="outlined" 
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Last completed: {workout.lastDone}
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {workout.muscleGroups.map((group) => (
                  <Chip 
                    key={group} 
                    label={group} 
                    size="small" 
                    variant="outlined" 
                  />
                ))}
              </Stack>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Flame size={16} color={theme.palette.error.main} style={{ marginRight: 4 }} />
                  {workout.calories} calories
                </Typography>
                <IconButton>
                  <ChevronRight size={20} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </TabPanel>
      
      {/* Diet Tab Panel */}
      <TabPanel value={tabValue} index={1}>
        <Card elevation={0} sx={{ mb: 3, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Today's Nutrition
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Calories
                </Typography>
                <Typography variant="h5" fontWeight={600} color="error.main">
                  {totalNutrition.calories}
                </Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Protein
                </Typography>
                <Typography variant="h5" fontWeight={600} color="primary.main">
                  {totalNutrition.protein}g
                </Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Carbs
                </Typography>
                <Typography variant="h5" fontWeight={600} color="warning.main">
                  {totalNutrition.carbs}g
                </Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Fat
                </Typography>
                <Typography variant="h5" fontWeight={600} color="success.main">
                  {totalNutrition.fat}g
                </Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={75} 
              sx={{ height: 10, borderRadius: 5, mb: 1 }} 
            />
            <Typography variant="caption" color="text.secondary">
              75% of daily goal
            </Typography>
          </CardContent>
        </Card>
        
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Meals Today
        </Typography>
        
        {mealData.map((meal) => (
          <Card 
            key={meal.type} 
            elevation={0} 
            sx={{ 
              mb: 2, 
              border: '1px solid', 
              borderColor: 'divider' 
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {meal.type}
                </Typography>
                <Chip 
                  size="small" 
                  label={`${meal.calories} kcal`} 
                  color="error" 
                  variant="outlined" 
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                <Chip size="small" label={`Protein: ${meal.protein}g`} color="primary" variant="outlined" />
                <Chip size="small" label={`Carbs: ${meal.carbs}g`} color="warning" variant="outlined" />
                <Chip size="small" label={`Fat: ${meal.fat}g`} color="success" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        ))}
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            startIcon={<PlusCircle size={18} />}
          >
            Add Meal
          </Button>
        </Box>
      </TabPanel>
      
      {/* Habits Tab Panel */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            Daily Habits
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<PlusCircle size={18} />}
            size="small"
          >
            New Habit
          </Button>
        </Box>
        
        <List sx={{ bgcolor: 'background.paper', borderRadius: 2, mb: 3, border: '1px solid', borderColor: 'divider' }}>
          {habits.map((habit, index) => (
            <React.Fragment key={habit.id}>
              {index > 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <Chip 
                    icon={<CalendarCheck size={14} />} 
                    label={`${habit.streak} day streak`} 
                    size="small" 
                    color="primary"
                    variant={habit.completed ? "filled" : "outlined"}
                  />
                }
              >
                <ListItemButton role={undefined} onClick={() => toggleHabitCompletion(habit.id)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={habit.completed}
                      disableRipple
                      inputProps={{ 'aria-labelledby': `habit-${habit.id}` }}
                      icon={<CheckCircle2 size={24} color={theme.palette.action.disabled} />}
                      checkedIcon={<CheckCircle2 size={24} color={theme.palette.success.main} />}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    id={`habit-${habit.id}`} 
                    primary={habit.name} 
                    primaryTypographyProps={{
                      style: {
                        textDecoration: habit.completed ? 'line-through' : 'none',
                        color: habit.completed ? theme.palette.text.secondary : theme.palette.text.primary,
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BarChart2 size={20} color={theme.palette.primary.main} style={{ marginRight: 8 }} />
              <Typography variant="h6" fontWeight={600}>
                Weekly Progress
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              You've completed 75% of your habits this week, which is 15% better than last week.
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={75} 
              sx={{ height: 10, borderRadius: 5, mt: 2 }} 
            />
          </CardContent>
        </Card>
      </TabPanel>
      
      {/* Supplements Tab Panel */}
      <TabPanel value={tabValue} index={3}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            Supplement Checklist
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<PlusCircle size={18} />}
            size="small"
          >
            Add Supplement
          </Button>
        </Box>
        
        <List 
          sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 2, 
            mb: 4, 
            border: '1px solid', 
            borderColor: 'divider'
          }}
        >
          {supplements.map((supplement, index) => (
            <React.Fragment key={supplement.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemButton role={undefined} onClick={() => toggleSupplementTaken(supplement.id)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={supplement.taken}
                      disableRipple
                      inputProps={{ 'aria-labelledby': `supplement-${supplement.id}` }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    id={`supplement-${supplement.id}`} 
                    primary={supplement.name} 
                    secondary={`${supplement.dosage}, ${supplement.time}`}
                    primaryTypographyProps={{
                      style: {
                        textDecoration: supplement.taken ? 'line-through' : 'none',
                        color: supplement.taken ? theme.palette.text.secondary : theme.palette.text.primary,
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        
        <Typography variant="body2" color="text.secondary" align="center">
          Remember to take your supplements at the right time for optimal benefits.
        </Typography>
      </TabPanel>
    </div>
  );
};

export default Health; 