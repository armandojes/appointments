/* eslint-disable react/forbid-prop-types */
import { array, object, oneOfType, string } from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

const Card = ({ children, className, style }) => (
  <div className={`${styles.card} ${className}`} style={style}>
    {children}
  </div>
);

Card.defaultProps = {
  className: '',
  style: {},
};

Card.propTypes = {
  children: oneOfType([string, array, object]).isRequired,
  className: string,
  style: object,
};

export default Card;
