import React from 'react';
import { Fade } from '@material-ui/core';
import { Check, ErrorOutline } from '@material-ui/icons';
import { string } from 'prop-types';

import styles from './styles.module.css';

const Notification = ({ message, type }) => {
  const inlineStyles = {
    background: type === 'success' ? 'var(--green)' : 'red',
  };

  return (
    <Fade in={!!message && !!type}>
      <div className={styles.card} style={inlineStyles}>
        {type === 'success' && <Check />}
        {type === 'error' && <ErrorOutline />}
        {message}
      </div>
    </Fade>
  );
};

Notification.propTypes = {
  message: string.isRequired,
  type: string.isRequired,
};

export default Notification;
