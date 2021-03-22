/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import { ButtonBase } from '@material-ui/core';
import { array, oneOfType, string, element, object } from 'prop-types';
import React from 'react';
import { colors } from '../../../constants';
import styles from './styles.module.css';

const Button = ({ variant, color, children, className, width, borderRadius, padding, ...otherProps }) => {
  const stylesInline = {
    width,
    border: variant === 'outlined' ? `1px solid ${color}` : '',
    background: variant === 'contained' ? color : 'transparent',
    color: variant === 'outlined' ? color : '#fff',
    fontSize: '1em',
    padding,
    borderRadius,
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
  borderRadius: '.3em',
  padding: '.6em .8em',
};

Button.propTypes = {
  variant: string,
  color: string,
  className: string,
  children: oneOfType([string, array, object, element]).isRequired,
  width: string,
  borderRadius: string,
  padding: string,
};

export default Button;
