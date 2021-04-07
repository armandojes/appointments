/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { array, number, object, oneOfType, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { onUserChangeState } from '../core/models/auth';
import context from './context';
import Notification from './notificationView';

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: null, type: 'success' });

  const handleSetNotification = ({ type = 'success', message = 'Colocar un mensaje' }) => {
    setNotification({ type, message });
    setTimeout(() => setNotification((currentState) => ({ ...currentState, message: null })), 7000);
  };

  return (
    <context.Provider value={handleSetNotification}>
      <Notification type={notification.type} message={notification.message} />
      {children}
    </context.Provider>
  );
};

NotificationProvider.propTypes = {
  children: oneOfType([string, array, object, number]).isRequired,
};

export default NotificationProvider;
