/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import { Fade } from '@material-ui/core';
import { Check, ErrorOutline } from '@material-ui/icons';
import React, { useState } from 'react';
import styles from './styles.module.css';

const Notification = (props) => {
  const inlineStyles = {
    background: props.type === 'success' ? 'var(--green)' : 'red',
  };

  return (
    <Fade in={!!props.message && props.type}>
      <div className={styles.card} style={inlineStyles}>
        {props.type === 'success' && <Check />}
        {props.type === 'error' && <ErrorOutline />}
        {props.message}
      </div>
    </Fade>
  );
};

const withNotifications = (WrappedComponent) => {
  const EnhacendComponent = (props) => {
    const [notification, setNotification] = useState({ message: null, type: 'success' });

    const handleSetNotification = ({ type = 'success', message = 'Colocar un mensaje' }) => {
      setNotification({ type, message });
      setTimeout(() => setNotification((currentState) => ({ ...currentState, message: null })), 7000);
    };

    return (
      <>
        <Notification type={notification.type} message={notification.message} />
        <WrappedComponent {...props} setNotification={handleSetNotification} />
      </>
    );
  };

  return EnhacendComponent;
};

export default withNotifications;
