export type TaskFilter = 'all' | 'completed' | 'pending';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
  createdAt?: string;
}

export interface CreateTaskPayload {
  title: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTaskPayload {
  id: number;
  completed: boolean;
}
