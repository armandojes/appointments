/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { bool, func, object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Text from 'src/components/main/text';
import Modal from 'src/components/modal';
import Button from 'src/components/main/button';
import Input from 'src/components/main/input';
import { colors } from 'src/constants';
import { createNewCompany } from 'src/core/models/companies';
import withNotifications from 'src/highOrderComponents/withNotification';
import useErrorMessage from 'src/hooks/useErrorMessage';
import useForm from 'src/hooks/useForm';
import ErrorMessage from '../../../../../../../../components/errorMessage';

const AprovingCompanyModal = ({ open, data, onClose, onSuccess, setNotification }) => {
  const { getInputProps, setValues, values } = useForm();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [isLoading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const response = await createNewCompany({ ...data, ...values });
    if (response.status === 'success') {
      onSuccess();
      onClose();
      setNotification({ type: 'success', message: 'Empresa creada correctamente' });
    } else {
      setLoading(false);
      setErrorMessage(response.errorMessage);
    }
  };

  // reset state when close
  useEffect(() => {
    setValues({});
    setLoading(false);
  }, [open]);

  return (
    <Modal open={open}>
      {!isLoading && (
        <>
          <Text textAlign="center" color={colors.blue} fontSize="1.2em" fontWeight="bold">Crear una contraseña</Text>
          <Box marginTop="2em">
            <ErrorMessage message={errorMessage} marginBottom="1em" />
            <Text mb=".5em" color={colors.blue}>contraseña</Text>
            <Input {...getInputProps('password')} />
            <Box mb=".5em" />
            <Text mb=".5em" color={colors.blue}>Repetir copntraseña</Text>
            <Input {...getInputProps('repassword')} />
            <Box mb="3em" />

            <Grid container justify="center" wrap="nowrap">
              <Button width="50%" onClick={onClose}>Cancelar</Button>
              <Box mr="1em" />
              <Button width="50%" onClick={handleSave} variant="contained">Crear</Button>
            </Grid>

          </Box>
        </>
      )}
      {isLoading && (
        <Grid justify="center" alignItems="center" style={{ minHeight: '15em' }} container>
          <CircularProgress />
        </Grid>
      )}
    </Modal>
  );
};

AprovingCompanyModal.propTypes = {
  open: bool.isRequired,
  data: object.isRequired,
  onClose: func.isRequired,
  onSuccess: func.isRequired,
  setNotification: func.isRequired,
};

export default withNotifications(AprovingCompanyModal);