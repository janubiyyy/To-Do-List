import type { Task, CreateTaskPayload, UpdateTaskPayload } from '../types/task.types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const INITIAL_FETCH_LIMIT = 10;

export const taskService = {
  /**
   * Fetch initial tasks from JSONPlaceholder API
   * Limited to INITIAL_FETCH_LIMIT for better UX
   */
  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(
      `${BASE_URL}/todos?_limit=${INITIAL_FETCH_LIMIT}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    const data: Task[] = await response.json();
    return data.map((task) => ({
      ...task,
      createdAt: new Date().toISOString(),
    }));
  },

  /**
   * Create a new task via POST (simulated via JSONPlaceholder)
   */
  async createTask(payload: CreateTaskPayload): Promise<Task> {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }
    const data: Task = await response.json();
    return {
      ...data,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Update task status via PATCH
   */
  async updateTask(payload: UpdateTaskPayload): Promise<Task> {
    const response = await fetch(`${BASE_URL}/todos/${payload.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: payload.completed }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Delete a task via DELETE
   */
  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }
  },
};
