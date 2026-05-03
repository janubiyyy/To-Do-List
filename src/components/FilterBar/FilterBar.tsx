import React from 'react';
import type { TaskFilter } from '../../types/task.types';
import styles from './FilterBar.module.css';

interface FilterOption {
  value: TaskFilter;
  label: string;
  emoji: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All', emoji: '📋' },
  { value: 'pending', label: 'Pending', emoji: '⏳' },
  { value: 'completed', label: 'Completed', emoji: '✅' },
];

interface FilterBarProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  counts: {
    total: number;
    pending: number;
    completed: number;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const getCount = (filter: TaskFilter) => {
    switch (filter) {
      case 'all':
        return counts.total;
      case 'pending':
        return counts.pending;
      case 'completed':
        return counts.completed;
    }
  };

  return (
    <div className={styles.bar} role="tablist" aria-label="Task filter">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          id={`filter-${option.value}`}
          role="tab"
          aria-selected={activeFilter === option.value}
          className={`${styles.btn} ${activeFilter === option.value ? styles.active : ''}`}
          onClick={() => onFilterChange(option.value)}
        >
          <span className={styles.emoji} aria-hidden="true">{option.emoji}</span>
          <span className={styles.label}>{option.label}</span>
          <span className={`${styles.count} ${activeFilter === option.value ? styles.countActive : ''}`}>
            {getCount(option.value)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
