import { Task, FilterOption } from '../types';

// Demo tasks data for initial state
export const demoTasks: Task[] = [
  { id: 1, text: 'Complete project proposal', completed: false, priority: 'high', date: '2023-04-20', project: 'Work' },
  { id: 2, text: 'Buy groceries', completed: true, priority: 'medium', date: '2023-04-19', project: 'Personal' },
  { id: 3, text: 'Schedule team meeting', completed: false, priority: 'high', date: '2023-04-21', project: 'Work' },
  { id: 4, text: 'Workout session', completed: true, priority: 'low', date: '2023-04-19', project: 'Health' },
  { id: 5, text: 'Read book chapter', completed: false, priority: 'medium', date: '2023-04-20', project: 'Personal' },
];

// Get all tasks
export const getAllTasks = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : demoTasks;
};

// Save tasks to localStorage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add a new task
export const addTask = (task: Omit<Task, 'id'>, tasks: Task[]): Task[] => {
  const newTask = {
    ...task,
    id: Math.max(0, ...tasks.map(t => t.id)) + 1
  };
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Toggle task completion
export const toggleTaskCompletion = (id: number, tasks: Task[]): Task[] => {
  const updatedTasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Delete a task
export const deleteTask = (id: number, tasks: Task[]): Task[] => {
  const updatedTasks = tasks.filter(task => task.id !== id);
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Filter tasks based on filter option
export const filterTasks = (tasks: Task[], filterOption: FilterOption, searchTerm: string): Task[] => {
  let filteredTasks = [...tasks];
  
  // Apply search filter
  if (searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    filteredTasks = filteredTasks.filter(task => 
      task.text.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  
  // Apply status filter
  switch (filterOption) {
    case 'Completed':
      return filteredTasks.filter(task => task.completed);
    case 'Active':
      return filteredTasks.filter(task => !task.completed);
    case 'High Priority':
      return filteredTasks.filter(task => task.priority === 'high');
    default:
      return filteredTasks;
  }
}; 