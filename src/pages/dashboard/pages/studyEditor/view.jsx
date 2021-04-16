/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { bool, func, string } from 'prop-types';
import React from 'react';
import Card from 'src/components/card';
import Input from 'src/components/main/input';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import ErrorMessage from 'src/components/errorMessage';
import Button from 'src/components/main/button';
import styles from './styles.module.css';

const TextArea = ({ error, ...props }) => {
  return <textarea {...props} />;
};

TextArea.propTypes = {
  error: bool.isRequired,
};

const View = ({ isEditing, getInputProps, errorMessage, isLoading, onSave, onCancel }) => (
  <Card className={styles.card}>
    {isLoading && (
      <Grid container justify="center" style={{ minHeight: '15em' }} alignItems="center">
        <CircularProgress />
      </Grid>
    )}
    {!isLoading && (
      <div>
        <Box marginBottom="2em">
          <Text color={colors.blue} fontSize="1.3em" fontWeight="bold">{ isEditing ? 'Actualizar estudio' : 'Crear estudio' }</Text>
        </Box>
        <ErrorMessage message={errorMessage} marginBottom="1em" />
        <Box marginBottom="1em">
          <Text color={colors.blue} fontWeight="bold">Titulo</Text>
          <Input maxLength={100} {...getInputProps('title')} />
        </Box>
        <Box marginBottom="1em">
          <Text color={colors.blue} fontWeight="bold">Indicaciones</Text>
          <TextArea {...getInputProps('indications')} className={styles.textArea} />
        </Box>
        <Grid container justify="flex-end" wrap="nowrap">
          <Button width="8em" variant="outlined" onClick={onCancel}>Cancelar</Button>
          <Box pr="1em" />
          <Button width="8em" variant="contained" onClick={onSave}>Guardar</Button>
        </Grid>
      </div>
    )}
  </Card>
);

View.propTypes = {
  isEditing: bool.isRequired,
  getInputProps: func.isRequired,
  errorMessage: string.isRequired,
  isLoading: bool.isRequired,
  onSave: func.isRequired,
  onCancel: func.isRequired,
};

export default View;
