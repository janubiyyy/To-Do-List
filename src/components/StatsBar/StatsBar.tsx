import React from 'react';
import styles from './StatsBar.module.css';

interface StatsBarProps {
  total: number;
  completed: number;
  pending: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ total, completed, pending }) => {
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.statsBar}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{total}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={`${styles.statCard} ${styles.statPending}`}>
          <span className={styles.statValue}>{pending}</span>
          <span className={styles.statLabel}>Pending</span>
        </div>
        <div className={`${styles.statCard} ${styles.statDone}`}>
          <span className={styles.statValue}>{completed}</span>
          <span className={styles.statLabel}>Done</span>
        </div>
      </div>

      {total > 0 && (
        <div className={styles.progressWrapper} aria-label={`${progressPercent}% tasks completed`}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Progress</span>
            <span className={styles.progressPercent}>{progressPercent}%</span>
          </div>
          <div className={styles.progressTrack} role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsBar;
