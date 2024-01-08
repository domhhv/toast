import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from "../ToastShelf";
import {ToastContext} from "../ToastProvider";

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const { toasts, popToast, dismissToasts } = React.useContext(ToastContext);
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  function handleVariantChange(event) {
    setVariant(event.target.value);
  }

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  function handlePopToast(event) {
    event.preventDefault();
    popToast({ message, variant });
    setMessage('')
    setVariant(VARIANT_OPTIONS[0]);
  }

  function handleDismissToast(id) {
    dismissToasts(id);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} onDismiss={handleDismissToast} />

      <form onSubmit={handlePopToast} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={handleMessageChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((variantName) => {
              const id = `variant-${variantName}`;

              return (
                  <label key={variantName} htmlFor={id}>
                    <input
                        id={id}
                        type="radio"
                        name="variant"
                        value={variantName}
                        checked={variant === variantName}
                        onChange={handleVariantChange}
                    />
                    {variantName}
                  </label>
              )
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
