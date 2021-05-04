/* eslint-disable arrow-body-style */
import { Box } from '@material-ui/core';
import { bool, func, string } from 'prop-types';
import React from 'react';
import Input from 'src/components/main/input';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import ErrorMessage from '../../../../../../components/errorMessage';
import styles from './styles.module.css';

const TextArea = ({ error, ...props }) => {
  return <textarea {...props} />;
};

TextArea.propTypes = {
  error: bool.isRequired,
};

const Form = ({ title, getInputProps, errorMessage }) => {
  return (
    <>
      <Text textAlign="center" marginBottom="2em" fontSize="1em" fontWeight="bold" color={colors.blue}>Información general</Text>
      <ErrorMessage message={errorMessage} />
      <Text fontSize="1.2em" color={colors.blue} fontWeight="bold" marginBottom="1em">{title}</Text>
      <Box marginBottom="1em">
        <Text color={colors.blue} marginBottom=".2em" fontWeight="bold">Titulo</Text>
        <Input {...getInputProps('title')} />
      </Box>
      <Box marginBottom="1em">
        <Text color={colors.blue} marginBottom=".2em" fontWeight="bold">Indicaciones</Text>
        <TextArea className={styles.textArea} {...getInputProps('indications')} />
      </Box>
    </>
  );
};

Form.defaultProps = {
  errorMessage: '',
};

Form.propTypes = {
  title: string.isRequired,
  getInputProps: func.isRequired,
  errorMessage: string,
};

export default Form;
