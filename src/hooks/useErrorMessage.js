import { useEffect, useState } from 'react';

const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewErrorMessage = (newErrorMessage) => {
    setErrorMessage(newErrorMessage);
  };

  useEffect(() => {
    if (errorMessage) {
      const timerId = setTimeout(() => setErrorMessage(''), 7000);
      return () => clearTimeout(timerId);
    }
    return undefined;
  }, [errorMessage]);

  return {
    errorMessage,
    setErrorMessage: handleNewErrorMessage,
  };
};

export default useErrorMessage;
