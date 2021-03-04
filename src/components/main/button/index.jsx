import { ButtonBase } from '@material-ui/core';
import { array, oneOfType, string, element, object } from 'prop-types';
import React from 'react';
import { colors } from '../../../constants';
import styles from './styles.module.css';

const Button = ({ variant, color, children }) => {
  const stylesInline = {
    border: variant === 'outlined' ? `1px solid ${color}` : '',
    background: variant === 'contained' ? color : 'transparent',
    color: variant === 'outlined' ? color : '#fff',
    fontSize: '1em',
    padding: '.3em .8em',
    borderRadius: '.5em',
  };

  return (
    <ButtonBase style={stylesInline} className={styles.button}>
      {children}
    </ButtonBase>
  );
};

Button.defaultProps = {
  variant: 'outlined',
  color: colors.blue,
};

Button.propTypes = {
  variant: string,
  color: string,
  children: oneOfType([string, array, object, element]).isRequired,
};

export default Button;
