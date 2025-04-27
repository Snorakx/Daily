import React from 'react';
import { Task } from '../types';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';

// Define Props
interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const getPriorityColor = (priority: string): 'error' | 'warning' | 'success' | 'default' => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        px: 2,
        borderRadius: 1,
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Checkbox
        checked={task.completed}
        onChange={onToggle}
        inputProps={{ 'aria-label': 'toggle task' }}
      />
      
      <Box sx={{ flexGrow: 1, ml: 1 }}>
        <Typography
          variant="body1"
          component="div"
          sx={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'text.secondary' : 'text.primary',
          }}
        >
          {task.text}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 1 }}>
          <Chip 
            label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            color={getPriorityColor(task.priority)}
            size="small"
            variant="outlined"
          />
          
          {task.project && (
            <Chip 
              label={task.project}
              size="small"
              variant="outlined"
            />
          )}
          
          {task.date && (
            <Typography variant="caption" color="text.secondary">
              {format(new Date(task.date), 'MMM d, yyyy')}
            </Typography>
          )}
        </Box>
      </Box>
      
      <IconButton 
        aria-label="delete task" 
        onClick={onDelete}
        size="small"
        edge="end"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default TaskItem; 