export type Priority = 'low' | 'medium' | 'high';

export type TaskStatus = 'completed' | 'active';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  project?: string;
  date?: string;
}

export type FilterOption = 'All' | 'Active' | 'Completed' | 'High Priority'; 