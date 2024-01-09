import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children}) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const escapeListener = (event) => {
      if (event.key === 'Escape') {
        closeAllToasts();
      }
    }

    window.addEventListener('keydown', escapeListener);

    return () => {
      window.removeEventListener('keydown', escapeListener);
    }
  });

  function handleDismissToast(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  function popToast({ message, variant }) {
    setToasts([...toasts, { id: crypto.randomUUID(), message, variant }]);
  }

  const closeAllToasts = () => {
    setToasts([]);
  }

  const value = React.useMemo(() => ({
    toasts,
    popToast,
    dismissToast: handleDismissToast,
  }), [toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
