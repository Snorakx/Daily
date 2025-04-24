import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Card, 
  CardContent, 
  LinearProgress, 
  Stack, 
  Chip,
  IconButton,
  useTheme
} from '@mui/material';
import { Play, Pause, SkipForward, RotateCcw, Coffee, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Pomodoro.module.scss';

// Pomodoro settings
const POMODORO_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds
const POMODORO_CYCLES = 4; // Number of pomodoros before a long break

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const Pomodoro = () => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [currentTask] = useState('Working on project documentation');
  
  // Time display formatting
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Progress calculation
  const getMaxTime = () => {
    switch(mode) {
      case 'pomodoro': return POMODORO_TIME;
      case 'shortBreak': return SHORT_BREAK_TIME;
      case 'longBreak': return LONG_BREAK_TIME;
    }
  };
  
  const progress = ((getMaxTime() - timeLeft) / getMaxTime()) * 100;
  
  // Timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      handleTimerComplete();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);
  
  // Handle timer completion
  const handleTimerComplete = () => {
    if (mode === 'pomodoro') {
      // Completed a pomodoro
      const newCompleted = completedPomodoros + 1;
      setCompletedPomodoros(newCompleted);
      
      // After 4 pomodoros, take a long break
      if (newCompleted % POMODORO_CYCLES === 0) {
        setMode('longBreak');
        setTimeLeft(LONG_BREAK_TIME);
      } else {
        setMode('shortBreak');
        setTimeLeft(SHORT_BREAK_TIME);
      }
    } else {
      // Break is over, start a new pomodoro
      setMode('pomodoro');
      setTimeLeft(POMODORO_TIME);
    }
  };
  
  // Start or pause timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  // Skip current timer
  const skipTimer = () => {
    handleTimerComplete();
    setIsRunning(false);
  };
  
  // Reset timer
  const resetTimer = () => {
    setTimeLeft(getMaxTime());
    setIsRunning(false);
  };
  
  // Get the current mode's color
  const getModeColor = () => {
    switch(mode) {
      case 'pomodoro': return theme.palette.primary.main;
      case 'shortBreak': return theme.palette.success.main;
      case 'longBreak': return theme.palette.secondary.main;
    }
  };
  
  // Get a readable name for the current mode
  const getModeName = () => {
    switch(mode) {
      case 'pomodoro': return 'Focus Time';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
    }
  };
  
  // Sample focus history data
  const focusHistory = [
    { day: 'Mon', minutes: 75 },
    { day: 'Tue', minutes: 100 },
    { day: 'Wed', minutes: 50 },
    { day: 'Thu', minutes: 125 },
    { day: 'Fri', minutes: 80 },
    { day: 'Sat', minutes: 30 },
    { day: 'Sun', minutes: 0 },
  ];
  
  // Find max minutes for scaling
  const maxMinutes = Math.max(...focusHistory.map(day => day.minutes));
  
  return (
    <div className={styles.pomodoroContainer}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Pomodoro Timer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay focused and take breaks at the right time
        </Typography>
      </Box>
      
      {/* Mode selector */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Stack direction="row" spacing={1}>
          <Button 
            variant={mode === 'pomodoro' ? 'contained' : 'outlined'} 
            onClick={() => { setMode('pomodoro'); setTimeLeft(POMODORO_TIME); setIsRunning(false); }}
            startIcon={<BrainCircuit size={16} />}
          >
            Focus
          </Button>
          <Button 
            variant={mode === 'shortBreak' ? 'contained' : 'outlined'} 
            onClick={() => { setMode('shortBreak'); setTimeLeft(SHORT_BREAK_TIME); setIsRunning(false); }}
            color="success"
            startIcon={<Coffee size={16} />}
          >
            Short Break
          </Button>
          <Button 
            variant={mode === 'longBreak' ? 'contained' : 'outlined'} 
            onClick={() => { setMode('longBreak'); setTimeLeft(LONG_BREAK_TIME); setIsRunning(false); }}
            color="secondary"
            startIcon={<Coffee size={16} />}
          >
            Long Break
          </Button>
        </Stack>
      </Box>
      
      {/* Timer display */}
      <Paper 
        elevation={0}
        sx={{ 
          mb: 4, 
          p: 4, 
          borderRadius: 4,
          backgroundColor: mode === 'pomodoro' ? 'primary.light' : 
                            mode === 'shortBreak' ? 'success.light' : 'secondary.light',
          color: 'text.primary',
          border: '1px solid',
          borderColor: getModeColor(),
          maxWidth: 500,
          mx: 'auto',
        }}
      >
        <Typography 
          variant="h6" 
          color="text.secondary" 
          align="center" 
          gutterBottom
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: getModeColor(),
            fontWeight: 500,
          }}
        >
          {mode === 'pomodoro' ? <BrainCircuit size={20} /> : <Coffee size={20} />}
          <Box component="span" sx={{ ml: 1 }}>{getModeName()}</Box>
        </Typography>
        
        <motion.div 
          key={mode}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography 
            variant="h1" 
            align="center" 
            sx={{ 
              fontWeight: 700, 
              my: 2,
              fontSize: { xs: '4rem', sm: '6rem' },
              color: getModeColor(),
            }}
          >
            {displayTime}
          </Typography>
        </motion.div>
        
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 10, 
            borderRadius: 5, 
            mb: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getModeColor(),
            }
          }} 
        />
        
        {mode === 'pomodoro' && (
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Current Task:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {currentTask}
            </Typography>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={toggleTimer}
            startIcon={isRunning ? <Pause /> : <Play />}
            sx={{ 
              borderRadius: 28, 
              px: 3,
              backgroundColor: getModeColor(),
              '&:hover': {
                backgroundColor: mode === 'pomodoro' ? 'primary.dark' : 
                                mode === 'shortBreak' ? 'success.dark' : 'secondary.dark',
              }
            }}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          
          <IconButton onClick={skipTimer} size="large" sx={{ color: 'text.secondary' }}>
            <SkipForward />
          </IconButton>
          
          <IconButton onClick={resetTimer} size="large" sx={{ color: 'text.secondary' }}>
            <RotateCcw />
          </IconButton>
        </Box>
      </Paper>
      
      {/* Today's statistics */}
      <Card 
        elevation={0}
        sx={{ 
          mb: 4, 
          border: '1px solid',
          borderColor: 'divider',
          maxWidth: 500,
          mx: 'auto'
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Today's Focus
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight={600} color="primary.main">
                {completedPomodoros}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pomodoros
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h4" fontWeight={600} color="primary.main">
                {completedPomodoros * 25}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Minutes
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h4" fontWeight={600} color="success.main">
                {Math.floor(completedPomodoros / POMODORO_CYCLES)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Long Breaks
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      {/* Weekly focus */}
      <Card 
        elevation={0}
        sx={{ 
          border: '1px solid',
          borderColor: 'divider',
          maxWidth: 500,
          mx: 'auto'
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Weekly Focus
            </Typography>
            <Chip 
              label="175 min average" 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 100, mt: 2, mb: 1 }}>
            {focusHistory.map((day, index) => (
              <Box 
                key={day.day} 
                sx={{ 
                  flex: 1,
                  mx: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: `${(day.minutes / maxMinutes) * 100}%`,
                    backgroundColor: index === 6 ? 'divider' : 'primary.main',
                    borderRadius: 1,
                    mb: 1,
                    minHeight: 4,
                  }} 
                />
                <Typography variant="caption" color="text.secondary">
                  {day.day}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pomodoro; 