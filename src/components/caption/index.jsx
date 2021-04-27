/* eslint-disable no-unused-vars */
import { Fade } from '@material-ui/core';
import { any, string } from 'prop-types';
import React, { useState } from 'react';
import styles from './styles.module.css';

const Caption = ({ className, message, children }) => {
  const [isVisible, setIsVisisble] = useState(false);

  const handleMouseEnter = () => setIsVisisble(true);
  const handleMouseLeave = () => setIsVisisble(false);

  return (
    <div className={`${styles.wrapper} ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <Fade in={isVisible}>
        <div className={styles.messageWrapper}>
          <div className={styles.message}>{message}</div>
        </div>
      </Fade>
    </div>
  );
};

Caption.defaultProps = {
  className: '',
};

Caption.propTypes = {
  className: string,
  children: any.isRequired,
  message: string.isRequired,
};

export default Caption;
