import React from 'react';
import {useEscapeKey} from "../../hooks";

export const ToastContext = React.createContext();

function ToastProvider({ children}) {
  const [toasts, setToasts] = React.useState([]);

  const closeAllToasts = () => {
    setToasts([]);
  }

  useEscapeKey(closeAllToasts);

  function handleDismissToast(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  function popToast({ message, variant }) {
    setToasts([...toasts, { id: crypto.randomUUID(), message, variant }]);
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
