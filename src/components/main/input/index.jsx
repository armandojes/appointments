/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import { bool, func, number, string } from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

// filters
const onlyNumbersFilter = (value = '') => {
  const lastCharacter = value.toString().split('')[value.toString().split('').length - 1];
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ''].includes(parseInt(lastCharacter, 10));
};

const maxLengthFilter = (value = '', maxLengthAvailable = 0) => {
  const currentLength = value.toString().length;
  return currentLength <= maxLengthAvailable;
};

const onlyFloatFilter = (value = '') => {
  const arrayOfCharacteres = value.toString().split('');
  const lastCharacter = arrayOfCharacteres[arrayOfCharacteres.length - 1];
  const hasMutipleDots = arrayOfCharacteres.filter((character) => character === '.').length > 1;
  if (hasMutipleDots) return false;
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(lastCharacter);
};

const Input = ({ onChange, error, className, onlyNumbers, onlyFloat, maxLength, variant, padding, ...inputProps }) => {
  const handleChange = (e) => {
    if (!e.target.value) return onChange(e);
    if (onlyNumbers && !onlyNumbersFilter(e.target.value)) return null;
    if (onlyFloat && !onlyFloatFilter(e.target.value)) return null;
    if (maxLength && !maxLengthFilter(e.target.value, maxLength)) return null;
    const parsedValue = onlyNumbers ? parseInt(e.target.value, 10) : e.target.value;
    onChange({ target: { name: e.target.name, value: parsedValue } });
    return null;
  };

  const inlineStyles = {};
  if (error) inlineStyles.borderColor = 'red';
  if (padding) inlineStyles.padding = padding;
  const calculatedStyle = variant === 'underline' ? styles.inputUnderLine : styles.input;

  return (
    <input {...inputProps} className={`${calculatedStyle} ${className}`} style={inlineStyles} onChange={handleChange} />
  );
};

Input.defaultProps = {
  className: '',
  onlyNumbers: false,
  onlyFloat: false,
  maxLength: null,
  variant: 'outlined',
  padding: null,
};

Input.propTypes = {
  onChange: func.isRequired,
  error: bool.isRequired,
  className: string,
  onlyNumbers: bool,
  onlyFloat: bool,
  maxLength: number,
  variant: string,
  padding: string,
};

export default Input;
