import { useState, useCallback, useEffect, useRef } from 'react';

const useToast = (duration = 3500) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id]);
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const show = useCallback((message, type = 'info', title = '') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, title }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
  }, [dismiss, duration]);

  // cleanup on unmount
  useEffect(() => {
    const t = timers.current;
    return () => Object.values(t).forEach(clearTimeout);
  }, []);

  return { toasts, show, dismiss };
};

export default useToast;
