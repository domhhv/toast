import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toasts, onDismiss }) {
  return (
    <ol className={styles.wrapper} role='region' aria-live='polite' aria-label='Notification'>
      {toasts.map((toast, index) => (
        <li key={index} className={styles.toastWrapper}>
          <Toast open variant={toast.variant} onDismiss={() => onDismiss(toast.id)}>{toast.message}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
