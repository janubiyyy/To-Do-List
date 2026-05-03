import React, { useState, useRef, useEffect } from 'react';
import styles from './AddTaskForm.module.css';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
  disabled?: boolean;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, disabled = false }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onAdd(value.trim());
    setValue('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Auto focus on mount
    inputRef.current?.focus();
  }, []);

  const charCount = value.length;
  const maxChars = 150;
  const isOverLimit = charCount > maxChars;
  const canSubmit = value.trim().length > 0 && !disabled && !isOverLimit;

  return (
    <form
      className={`${styles.form} ${isFocused ? styles.focused : ''}`}
      onSubmit={handleSubmit}
      aria-label="Add new task form"
    >
      <div className={styles.inputWrapper}>
        <span className={styles.inputIcon} aria-hidden="true">✏️</span>
        <input
          ref={inputRef}
          id="new-task-input"
          type="text"
          className={styles.input}
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          aria-label="New task title"
          maxLength={200}
        />
        {value && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => setValue('')}
            aria-label="Clear input"
          >
            ×
          </button>
        )}
      </div>

      <div className={styles.formFooter}>
        <span className={`${styles.charCount} ${isOverLimit ? styles.overLimit : ''}`}>
          {charCount}/{maxChars}
        </span>
        <button
          id="add-task-btn"
          type="submit"
          className={styles.submitBtn}
          disabled={!canSubmit}
          aria-label="Add task"
        >
          <span className={styles.btnIcon}>+</span>
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
