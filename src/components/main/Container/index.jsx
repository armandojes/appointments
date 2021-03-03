import React from 'react';
import { array, node, object, oneOfType, string, bool } from 'prop-types';
import styles from './styles.module.css';

console.log('styles', styles);

const Container = ({ children, paddingTopDissabled }) => {
  const classes = paddingTopDissabled ? `${styles.wrapper} ${styles.paddingonliLateral}` : styles.wrapper;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  paddingTopDissabled: false,
};

Container.propTypes = {
  children: oneOfType([array, string, object, node]).isRequired,
  paddingTopDissabled: bool,
};

export default Container;
