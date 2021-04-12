/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Input from 'src/components/main/input';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { colors } from 'src/constants';
import Button from 'src/components/main/button';
import Modal from 'src/components/modal';
import Text from 'src/components/main/text';
import { func, bool, string } from 'prop-types';
import ErrorMessage from '../../../../components/errorMessage';

const BranchGeneralInfoForm = ({ open, getInputProps, onClose, onConfirm, isLoading, headerText, errorMessage }) => (
  <Modal open={open}>
    {isLoading && (
    <Grid container alignItems="center" justify="center" style={{ minHeight: '200px' }}>
      <CircularProgress />
    </Grid>
    )}
    {!isLoading && (
    <>
      <Box marginBottom="1.5em">
        <Text fontWeight="bold" color={colors.green} fontSize="1.2em">{headerText}</Text>
      </Box>
      <ErrorMessage message={errorMessage} />
      <Box marginBottom=".5em">
        <Text color={colors.blue} mb=".2em">Nombre</Text>
        <Input {...getInputProps('name')} maxLength={50} />
      </Box>
      <Box marginBottom=".5em">
        <Text color={colors.blue} mb=".2em">Dirección</Text>
        <Input {...getInputProps('address')} maxLength={100} />
      </Box>
      <Box marginBottom="2em">
        <Text color={colors.blue} mb=".2em">Teléfonos (separadas por coma)</Text>
        <Input {...getInputProps('phonesCrud')} placeholder="111111, 222222, 333333" maxLength={50} />
      </Box>
      <Grid container wrap="nowrap">
        <Button color={colors.blue} width="50%" onClick={onClose}>Cancelar</Button>
        <Box padding=".5em" />
        <Button color={colors.blue} width="50%" variant="contained" onClick={onConfirm}>Guardar</Button>
      </Grid>
    </>
    )}
  </Modal>
);

BranchGeneralInfoForm.defaultProps = {
  headerText: 'Información general',
};

BranchGeneralInfoForm.propTypes = {
  getInputProps: func.isRequired,
  isLoading: bool.isRequired,
  open: bool.isRequired,
  onClose: func.isRequired,
  onConfirm: func.isRequired,
  headerText: string,
  errorMessage: string.isRequired,
};

export default BranchGeneralInfoForm;
