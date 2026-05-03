import React from 'react';
import styles from './TaskList.module.css';
import TaskItem from '../TaskItem/TaskItem';
import type { Task } from '../../types/task.types';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const SkeletonItem: React.FC = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeletonCheck} />
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonBadge} />
    </div>
  </div>
);

const EmptyState: React.FC = () => (
  <div className={styles.empty} aria-live="polite">
    <div className={styles.emptyIcon} aria-hidden="true">🎉</div>
    <h3 className={styles.emptyTitle}>No tasks here!</h3>
    <p className={styles.emptyText}>Add a new task above or change the filter.</p>
  </div>
);

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onToggle,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className={styles.list} aria-label="Loading tasks">
        {Array.from({ length: 5 }, (_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.list} role="list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
