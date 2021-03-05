import { array, object, oneOfType, string } from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

const Card = ({ children }) => (
  <div className={styles.card}>
    {children}
  </div>
);

Card.propTypes = {
  children: oneOfType([string, array, object]).isRequired,
};

export default Card;
