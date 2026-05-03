import React from 'react';
import { useTasks } from './hooks/useTasks';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskList from './components/TaskList/TaskList';
import FilterBar from './components/FilterBar/FilterBar';
import StatsBar from './components/StatsBar/StatsBar';
import Toast from './components/Toast/Toast';
import styles from './App.module.css';

const App: React.FC = () => {
  const {
    tasks,
    filter,
    isLoading,
    error,
    stats,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearError,
  } = useTasks();

  return (
    <div className={styles.appBg}>

      <main className={styles.main}>
        {/* ── Header ───────────────────────── */}
        <header className={styles.header}>
          <div className={styles.logoWrapper} aria-hidden="true">
            <span className={styles.logoIcon}>☑</span>
          </div>
          <h1 className={styles.title}>TaskFlow</h1>
          <p className={styles.subtitle}>Stay organized, stay productive</p>
        </header>

        {/* ── Stats ────────────────────────── */}
        <section className={styles.section} aria-label="Task statistics">
          <StatsBar
            total={stats.total}
            completed={stats.completed}
            pending={stats.pending}
          />
        </section>

        {/* ── Add Task ─────────────────────── */}
        <section className={styles.section} aria-label="Add new task">
          <AddTaskForm onAdd={addTask} disabled={isLoading} />
        </section>

        {/* ── Filter ───────────────────────── */}
        <section className={styles.section} aria-label="Filter tasks">
          <FilterBar
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={{
              total: stats.total,
              pending: stats.pending,
              completed: stats.completed,
            }}
          />
        </section>

        {/* ── Task List ────────────────────── */}
        <section className={styles.section} aria-label="Task list">
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>

        {/* ── Footer ───────────────────────── */}
        <footer className={styles.footer}>
          <p>
            Made with ❤️ by{' '}
            <span className={styles.footerHighlight}>Tasya Khaerani Janubiya</span>
          </p>
        </footer>
      </main>

      {/* ── Toast Notification ───────────────── */}
      {error && <Toast message={error} onClose={clearError} />}
    </div>
  );
};

export default App;
