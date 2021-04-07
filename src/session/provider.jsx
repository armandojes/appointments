import { array, number, object, oneOfType, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { onUserChangeState } from '../core/models/auth';
import context from './context';

const getSessionFromLocalStorage = () => {
  let sessionmoized = localStorage.getItem('session');
  if (!sessionmoized) return null;
  sessionmoized = JSON.parse(sessionmoized);
  return sessionmoized;
};

const SessionProvider = ({ children }) => {
  const [state, setState] = useState(getSessionFromLocalStorage());

  const handleSetState = async (newState) => {
    setState(newState);
    try {
      if (newState) window.localStorage.setItem('session', JSON.stringify(newState));
      else window.localStorage.removeItem('session');
    } catch (error) {
      console.log('erroWithLocalStorage');
    }
  };

  // listen users's session status
  useEffect(() => {
    onUserChangeState((sessionData) => {
      handleSetState(sessionData);
    });
  }, []);

  return (
    <context.Provider value={state}>
      {children}
    </context.Provider>
  );
};

SessionProvider.propTypes = {
  children: oneOfType([string, array, object, number]).isRequired,
};

export default SessionProvider;
