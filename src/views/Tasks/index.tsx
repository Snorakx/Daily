import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Checkbox, 
  TextField, 
  InputAdornment, 
  Chip, 
  Fab, 
  Divider,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { Search, Plus, Filter, Calendar, MoreVertical, Trash2, Edit, Flag } from 'lucide-react';
import styles from './Tasks.module.scss';

// Demo tasks data
const initialTasks = [
  { id: 1, text: 'Update project documentation', completed: false, priority: 'high', date: '2023-06-15', project: 'Work' },
  { id: 2, text: 'Prepare presentation for client meeting', completed: false, priority: 'medium', date: '2023-06-15', project: 'Work' },
  { id: 3, text: 'Review team performance', completed: true, priority: 'medium', date: '2023-06-14', project: 'Work' },
  { id: 4, text: 'Grocery shopping for the week', completed: false, priority: 'low', date: '2023-06-16', project: 'Personal' },
  { id: 5, text: 'Schedule dentist appointment', completed: true, priority: 'medium', date: '2023-06-14', project: 'Personal' },
  { id: 6, text: 'Pay utility bills', completed: false, priority: 'high', date: '2023-06-16', project: 'Personal' },
];

// Filter options
const filterOptions = ['All', 'Completed', 'Active', 'High Priority'];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  
  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Toggle task completion
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Open context menu
  const handleTaskMenuOpen = (event: React.MouseEvent<HTMLElement>, taskId: number) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  // Close context menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedTaskId(null);
  };

  // Delete a task
  const handleDeleteTask = () => {
    if (selectedTaskId) {
      setTasks(tasks.filter(task => task.id !== selectedTaskId));
      handleMenuClose();
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Apply text search filter
    const matchesSearch = task.text.toLowerCase().includes(searchText.toLowerCase());
    
    // Apply status filter
    let matchesFilter = true;
    if (activeFilter === 'Completed') matchesFilter = task.completed;
    if (activeFilter === 'Active') matchesFilter = !task.completed;
    if (activeFilter === 'High Priority') matchesFilter = task.priority === 'high';

    return matchesSearch && matchesFilter;
  });

  // Group tasks by date
  const groupedTasks: Record<string, typeof tasks> = {};
  
  filteredTasks.forEach(task => {
    if (!groupedTasks[task.date]) {
      groupedTasks[task.date] = [];
    }
    groupedTasks[task.date].push(task);
  });

  const sortedDates = Object.keys(groupedTasks).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className={styles.tasksContainer}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Tasks
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            icon={<Calendar size={16} />} 
            label="This Week" 
            clickable 
            color="primary" 
            variant="outlined" 
          />
        </Box>
      </Box>
      
      {/* Search and filters */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            placeholder="Search tasks..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400 }}
          />
          <IconButton>
            <Filter size={20} />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {filterOptions.map((option) => (
            <Chip
              key={option}
              label={option}
              onClick={() => setActiveFilter(option)}
              color={activeFilter === option ? 'primary' : 'default'}
              variant={activeFilter === option ? 'filled' : 'outlined'}
              size="small"
            />
          ))}
        </Box>
      </Paper>
      
      {/* Task list grouped by date */}
      {sortedDates.map((date) => (
        <Paper 
          key={date} 
          elevation={0} 
          sx={{ 
            mb: 3, 
            borderRadius: 2, 
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ 
            px: 2, 
            py: 1, 
            backgroundColor: 'background.default', 
            borderBottom: '1px solid', 
            borderColor: 'divider' 
          }}>
            <Typography variant="subtitle2">{formatDate(date)}</Typography>
          </Box>
          
          <List disablePadding>
            {groupedTasks[date].map((task, index) => (
              <Box key={task.id}>
                {index > 0 && <Divider />}
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={(e) => handleTaskMenuOpen(e, task.id)}>
                      <MoreVertical size={18} />
                    </IconButton>
                  }
                  sx={{ 
                    pr: 6,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      sx={{
                        color: task.priority === 'high' ? 'error.main' : 
                          task.priority === 'medium' ? 'warning.main' : 'success.main',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.text}
                    primaryTypographyProps={{
                      style: {
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                      },
                    }}
                    secondary={task.project}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Paper>
      ))}
      
      {/* Floating action button to add new task */}
      <Fab 
        color="primary" 
        aria-label="add task" 
        className={styles.fab}
      >
        <Plus />
      </Fab>
      
      {/* Task context menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} dense>
          <ListItemIcon>
            <Edit size={18} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} dense>
          <ListItemIcon>
            <Flag size={18} />
          </ListItemIcon>
          <ListItemText>Change Priority</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteTask} dense sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <Trash2 size={18} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Tasks; 