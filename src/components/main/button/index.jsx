/* eslint-disable react/jsx-props-no-spreading */
import { ButtonBase } from '@material-ui/core';
import { array, oneOfType, string, element, object } from 'prop-types';
import React from 'react';
import { colors } from '../../../constants';
import styles from './styles.module.css';

const Button = ({ variant, color, children, className, width, ...otherProps }) => {
  const stylesInline = {
    width,
    border: variant === 'outlined' ? `1px solid ${color}` : '',
    background: variant === 'contained' ? color : 'transparent',
    color: variant === 'outlined' ? color : '#fff',
    fontSize: '1em',
    padding: '.6em .8em',
    borderRadius: '.3em',
  };

  return (
    <ButtonBase {...otherProps} style={stylesInline} className={`${styles.button} ${className}`}>
      {children}
    </ButtonBase>
  );
};

Button.defaultProps = {
  variant: 'outlined',
  color: colors.blue,
  className: '',
  width: 'auto',
};

Button.propTypes = {
  variant: string,
  color: string,
  className: string,
  children: oneOfType([string, array, object, element]).isRequired,
  width: string,
};

export default Button;
