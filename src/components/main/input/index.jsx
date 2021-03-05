/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './styles.module.css';

const Input = ({ error, className, ...inputProps }) => {
  return (
    <input {...inputProps} className={`${styles.input} ${className}`} />
  );
};

export default Input;
