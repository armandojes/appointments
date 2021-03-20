/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './styles.module.css';

const InputInderLine = ({ error, className, ...inputProps }) => {
  const inlineStyles = {};
  if (error) {
    inlineStyles.borderColor = 'red';
  }

  return (
    <input {...inputProps} className={`${styles.input} ${className}`} style={inlineStyles} />
  );
};

export default InputInderLine;
