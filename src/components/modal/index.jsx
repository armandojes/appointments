import React from 'react';
import { Modal as ModalBase } from '@material-ui/core';
import { oneOfType, array, object, string, bool } from 'prop-types';
import styles from './styles.module.css';

const Modal = ({ children, open = false, className }) => (
  <ModalBase className={styles.wrapper} open={open}>
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  </ModalBase>
);

Modal.defaultProps = {
  className: '',
};

Modal.propTypes = {
  children: oneOfType([string, array, object]).isRequired,
  open: bool.isRequired,
  className: string,
};

export default Modal;
