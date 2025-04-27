import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import TaskItem from './TaskItem';
import { Task, FilterOption } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (id: number) => void;
  onTaskDelete: (id: number) => void;
  filter?: FilterOption;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskToggle, onTaskDelete, filter }) => {
  const filteredTasks = filter 
    ? tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Active') return !task.completed;
        if (filter === 'Completed') return task.completed;
        if (filter === 'High Priority') return task.priority === 'high';
        return true;
      })
    : tasks;

  if (filteredTasks.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No tasks available. Start by adding a new task!
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {filteredTasks.map((task, index) => (
        <React.Fragment key={task.id}>
          <TaskItem 
            task={task}
            onToggle={() => onTaskToggle(task.id)}
            onDelete={() => onTaskDelete(task.id)}
          />
          {index < filteredTasks.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TaskList; 