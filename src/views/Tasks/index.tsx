import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  TextField, 
  Select, 
  FormControl, 
  InputLabel,
  Grid,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskList from '../../components/TaskList';
import { Task, FilterOption } from '../../types';

const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskProject, setNewTaskProject] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  
  // Simulating data fetching from an API
  useEffect(() => {
    // In a real app, this would be an API call
    const sampleTasks: Task[] = [
      { id: 1, text: 'Complete project proposal', completed: false, priority: 'high', project: 'Work', date: '2023-12-10' },
      { id: 2, text: 'Go for a run', completed: true, priority: 'medium', project: 'Personal' },
      { id: 3, text: 'Buy groceries', completed: false, priority: 'low', project: 'Home' },
    ];
    setTasks(sampleTasks);
  }, []);

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now(), // Simple ID generation for demo purposes
      text: newTaskText,
      completed: false,
      priority: newTaskPriority,
      project: newTaskProject || undefined,
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setNewTaskPriority('medium');
    setNewTaskProject('');
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleFilterChange = (event: React.SyntheticEvent, newValue: FilterOption) => {
    setActiveFilter(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task Manager
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add New Task</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Task"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What needs to be done?"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newTaskPriority}
                label="Priority"
                onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <TextField
              fullWidth
              label="Project"
              value={newTaskProject}
              onChange={(e) => setNewTaskProject(e.target.value)}
              placeholder="Optional"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddTask}
              disabled={!newTaskText.trim()}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeFilter} onChange={handleFilterChange}>
          <Tab label="All" value="All" />
          <Tab label="Active" value="Active" />
          <Tab label="Completed" value="Completed" />
          <Tab label="High Priority" value="High Priority" />
        </Tabs>
      </Box>

      <TaskList 
        tasks={tasks}
        onTaskToggle={handleToggleTask}
        onTaskDelete={handleDeleteTask}
        filter={activeFilter}
      />
    </Container>
  );
};

export default TasksView; 