import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Task, TaskFilter } from '../types/task.types';
import { taskService } from '../services/taskService';

let localIdCounter = 200;

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ─── Fetch initial tasks ──────────────────────────────────────────────────
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await taskService.fetchTasks();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // ─── Add task ─────────────────────────────────────────────────────────────
  const addTask = useCallback(async (title: string): Promise<void> => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const tempId = ++localIdCounter;

    // Optimistic update: add immediately with temp ID
    const optimisticTask: Task = {
      id: tempId,
      title: trimmed,
      completed: false,
      userId: 1,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      // Fire API in background — JSONPlaceholder always returns id:201
      await taskService.createTask({
        title: trimmed,
        completed: false,
        userId: 1,
      });
      // Keep local state since API returns the same data
    } catch {
      // Rollback on failure
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      setError('Failed to add task. Please try again.');
    }
  }, []);

  // ─── Toggle task status ───────────────────────────────────────────────────
  const toggleTask = useCallback(async (id: number): Promise<void> => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;

    const newCompleted = !target.completed;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
    );

    try {
      await taskService.updateTask({ id, completed: newCompleted });
    } catch {
      // Rollback on failure
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: target.completed } : t
        )
      );
      setError('Failed to update task. Please try again.');
    }
  }, [tasks]);

  // ─── Delete task ──────────────────────────────────────────────────────────
  const deleteTask = useCallback(async (id: number): Promise<void> => {
    const backup = tasks.find((t) => t.id === id);

    // Optimistic update
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await taskService.deleteTask(id);
    } catch {
      // Rollback on failure
      if (backup) {
        setTasks((prev) => [...prev, backup]);
      }
      setError('Failed to delete task. Please try again.');
    }
  }, [tasks]);

  // ─── Clear error ──────────────────────────────────────────────────────────
  const clearError = useCallback(() => setError(null), []);

  // ─── Filtered tasks (memoised) ────────────────────────────────────────────
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((t) => t.completed);
      case 'pending':
        return tasks.filter((t) => !t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // ─── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  }), [tasks]);

  return {
    tasks: filteredTasks,
    filter,
    isLoading,
    error,
    stats,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearError,
  };
};
