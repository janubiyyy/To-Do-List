import React, { useState } from 'react';
import type { Task } from '../../types/task.types';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);
    await onToggle(task.id);
    setIsToggling(false);
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    // Small delay for the exit animation
    setTimeout(() => onDelete(task.id), 300);
  };

  return (
    <div
      className={`${styles.item} ${task.completed ? styles.completed : ''} ${isDeleting ? styles.deleting : ''}`}
      role="listitem"
    >
      {/* Checkbox */}
      <button
        id={`toggle-task-${task.id}`}
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''} ${isToggling ? styles.toggling : ''}`}
        onClick={handleToggle}
        aria-label={task.completed ? `Mark task "${task.title}" as pending` : `Mark task "${task.title}" as done`}
        aria-pressed={task.completed}
      >
        {task.completed && (
          <svg className={styles.checkIcon} viewBox="0 0 12 10" fill="none" aria-hidden="true">
            <path
              d="M1 5L4.5 8.5L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className={styles.content}>
        <p className={styles.title}>{task.title}</p>
        <div className={styles.meta}>
          <span className={`${styles.badge} ${task.completed ? styles.badgeDone : styles.badgePending}`}>
            {task.completed ? '✓ Completed' : '○ Pending'}
          </span>
          {task.createdAt && (
            <span className={styles.date}>
              #{task.id}
            </span>
          )}
        </div>
      </div>

      {/* Delete button */}
      <button
        id={`delete-task-${task.id}`}
        className={styles.deleteBtn}
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Delete task "${task.title}"`}
      >
        <svg viewBox="0 0 24 24" fill="none" className={styles.trashIcon} aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;
