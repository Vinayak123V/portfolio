import { useState, useCallback } from 'react';

const useConfirm = () => {
  const [config, setConfig] = useState(null);
  const [resolver, setResolver] = useState(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfig(typeof options === 'string' ? { title: 'Confirm', message: options } : options);
      setResolver(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    resolver && resolver(true);
    setConfig(null);
    setResolver(null);
  }, [resolver]);

  const handleCancel = useCallback(() => {
    resolver && resolver(false);
    setConfig(null);
    setResolver(null);
  }, [resolver]);

  return { confirm, config, handleConfirm, handleCancel };
};

export default useConfirm;
