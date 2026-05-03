import React, { useEffect } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toast} role="alert" aria-live="assertive">
      <span className={styles.icon} aria-hidden="true">⚠️</span>
      <span className={styles.message}>{message}</span>
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
