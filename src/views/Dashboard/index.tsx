import { Grid as MuiGrid, Typography, Box, Card, CardContent, Paper, Stack, Chip, useTheme, LinearProgress } from '@mui/material';
import { CheckCircle, Clock, Activity, DollarSign, TrendingUp, BrainCircuit } from 'lucide-react';
import styles from './Dashboard.module.scss';

// Create typed Grid components
const Grid = MuiGrid as React.ComponentType<any>;

// Sample data for dashboard
const stats = {
  tasksCompleted: 12,
  totalTasks: 18,
  focusTime: 185, // in minutes
  todaySteps: 6842,
  todayCalories: 680,
  savingsGoals: 2,
  savingsProgress: 68, // percentage
  streak: 5,
};

// AI suggestion data
const aiSuggestion = {
  message: "You seem to have high energy in the mornings. Try scheduling important tasks between 9-11 AM.",
  type: "productivity",
};

// Quote of the day
const quoteOfDay = {
  text: "The future depends on what you do today.",
  author: "Mahatma Gandhi",
};

const Dashboard = () => {
  const theme = useTheme();

  return (
    <div className={styles.dashboardContainer}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Welcome back!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your productivity overview for today
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Tasks Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} className={styles.statCard}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(76, 110, 245, 0.1)',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <CheckCircle size={20} color={theme.palette.primary.main} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Tasks
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={600}>
                {stats.tasksCompleted}
                <Typography component="span" variant="body1" color="text.secondary">
                  /{stats.totalTasks}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed today
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(stats.tasksCompleted / stats.totalTasks) * 100} 
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Focus Time Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} className={styles.statCard}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 138, 101, 0.1)',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Clock size={20} color={theme.palette.secondary.main} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Focus Time
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={600}>
                {Math.floor(stats.focusTime / 60)}h {stats.focusTime % 60}m
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total focused time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} className={styles.statCard}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(46, 213, 115, 0.1)',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Activity size={20} color="#2ED573" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Health
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={600}>
                {stats.todaySteps.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Steps today ({stats.todayCalories} calories)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Savings Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} className={styles.statCard}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 165, 2, 0.1)',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <DollarSign size={20} color="#FFA502" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Savings
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={600}>
                {stats.savingsGoals}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active saving goals
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.savingsProgress} 
                sx={{ mt: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 165, 2, 0.2)', '& .MuiLinearProgress-bar': { backgroundColor: '#FFA502' } }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Suggestion Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          backgroundColor: 'primary.light',
          color: 'primary.dark',
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <BrainCircuit size={24} />
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                AI Assistant
              </Typography>
              <Chip
                label="Suggestion"
                size="small"
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontWeight: 500,
                  height: 24,
                }}
              />
            </Stack>
            <Typography variant="body2">{aiSuggestion.message}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Productivity Streak */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Productivity Streak
            </Typography>
            <Chip
              icon={<TrendingUp size={16} />}
              label={`${stats.streak} days`}
              size="small"
              color="primary"
              sx={{ fontWeight: 500 }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            {Array.from({ length: 7 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: index < stats.streak ? 'primary.main' : 'divider',
                  color: index < stats.streak ? 'white' : 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Quote of the Day */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: 'background.default',
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body1" fontStyle="italic" align="center" gutterBottom>
          "{quoteOfDay.text}"
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          — {quoteOfDay.author}
        </Typography>
      </Card>
    </div>
  );
};

export default Dashboard; 