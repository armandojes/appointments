/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import { Box, CircularProgress, Collapse, Grid } from '@material-ui/core';
import { bool, func, string } from 'prop-types';
import React from 'react';
import Modal from 'src/components/modal';
import Button from 'src/components/main/button';
import Input from 'src/components/main/input';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import { Alert } from '@material-ui/lab';

const EmploymentForm = ({ headerText, getInputProps, onClose, open, isLoading, onSave, errorMessage }) => {
  return (
    <Modal open={open}>
      {!isLoading && (
        <>
          <Text fontSize="1.2em" color={colors.green} fontWeight="bold" marginBottom="1em">{headerText}</Text>
          <Collapse in={!!errorMessage}>
            <Box marginBottom="1em">
              <Alert severity="error">{errorMessage}</Alert>
            </Box>
          </Collapse>
          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Nombre</Text>
            <Input {...getInputProps('name')} />
          </Box>
          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Apellidos</Text>
            <Input {...getInputProps('lastName')} />
          </Box>
          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Correo</Text>
            <Input {...getInputProps('email')} />
          </Box>
          <Box marginBottom="2em">
            <Text color={colors.blue} mb=".2em">contraseña</Text>
            <Input {...getInputProps('password')} />
          </Box>
          <Grid container wrap="nowrap">
            <Button color={colors.blue} width="100%" onClick={onClose}>Cancelar</Button>
            <Box padding=".5em" />
            <Button color={colors.blue} variant="contained" width="100%" onClick={onSave}>Guardar</Button>
          </Grid>
        </>
      )}
      {isLoading && (
        <Grid container justify="center" alignItems="center" style={{ minHeight: '200px' }}>
          <CircularProgress />
        </Grid>
      )}
    </Modal>
  );
};

EmploymentForm.defaultProps = {
  errorMessage: '',
};

EmploymentForm.propTypes = {
  headerText: string.isRequired,
  getInputProps: func.isRequired,
  onClose: func.isRequired,
  open: bool.isRequired,
  isLoading: bool.isRequired,
  onSave: func.isRequired,
  errorMessage: string,
};

export default EmploymentForm;
