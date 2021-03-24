/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { bool, func, object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'src/components/main/button';
import Input from 'src/components/main/input';
import Text from 'src/components/main/text';
import Modal from 'src/components/modal';
import { colors } from 'src/constants';
import useForm from 'src/hooks/useForm';
import ErrorMessage from 'src/components/errorMessage';
import { createNewCompany, updateCompany } from 'src/core/models/companies';
import withNotifications from 'src/highOrderComponents/withNotification';
import useErrorMessage from 'src/hooks/useErrorMessage';

const CompanyInfoModal = ({ isEditing, open, onSuccess, onClose, setNotification, data }) => {
  const { getInputProps, values, setValues } = useForm();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [isLoading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const response = await createNewCompany({ ...values, repassword: values.password });
    if (response.status === 'success') {
      onClose();
      onSuccess();
      setNotification({ type: 'success', messsage: 'Empresa creada correctamente' });
    } else {
      setLoading(false);
      setErrorMessage(response.errorMessage);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const response = await updateCompany(data.id, { ...values, repassword: values.password });
    if (response.status === 'success') {
      onClose();
      onSuccess();
      setNotification({ type: 'success', message: 'Datos actualizados correctamente' });
    } else {
      setLoading(false);
      setErrorMessage(response.errorMessage);
    }
  };

  const handleSave = () => {
    return !isEditing ? handleCreate() : handleUpdate();
  };

  // sync data
  useEffect(() => {
    if (data && isEditing) {
      setValues({
        companyName: data.company.name,
        userFullName: data.fullName,
        userEmail: data.email,
        password: data.password,
        companyPhone: data.company.phone,
        companyRazonSocial: data.company.razonSocial,
        companyAddress: data.company.address,
        companyRFC: data.company.rfc,
        companyEmail: data.company.email,
      });
    }
    return () => {
      setValues({});
      setLoading(false);
    };
  }, [data, open]);

  return (
    <Modal open={open}>
      {isLoading && (
        <Grid container justify="center" alignItems="center" style={{ minHeight: '11em' }}>
          <CircularProgress />
        </Grid>
      )}
      {!isLoading && (
        <>
          <ErrorMessage message={errorMessage} marginBottom="1em" />
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>Nombre de la empresa</Text>
            <Input padding=".4em" {...getInputProps('companyName')} maxLength={50} />
          </Box>
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>Nombre del responsable</Text>
            <Input padding=".4em" {...getInputProps('userFullName')} maxLength={50} />
          </Box>
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>Email</Text>
            <Input padding=".4em" placeholder="" {...getInputProps('userEmail')} maxLength={50} />
          </Box>
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>Contraseña</Text>
            <Input padding=".4em" placeholder="" {...getInputProps('password')} maxLength={30} />
          </Box>
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>Telefono</Text>
            <Input padding=".4em" placeholder="" {...getInputProps('companyPhone')} maxLength={10} onlyNumbers />
          </Box>
          <Text color={colors.blue} fontWeight="bold" marginBottom=".5em">Datos de facturación:</Text>
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>Razón social</Text>
            <Input padding=".4em" placeholder="" {...getInputProps('companyRazonSocial')} maxLength={50} />
          </Box>
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>Dirección fiscal completa</Text>
            <Input padding=".4em" placeholder="" {...getInputProps('companyAddress')} maxLength={50} />
          </Box>
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>RFC</Text>
            <Input padding=".4em" placeholder="" {...getInputProps('companyRFC')} maxLength={50} />
          </Box>
          <Box marginBottom=".2em">
            <Text fontWeight="bold" fontSize=".9em" color={colors.blue}>E-mail</Text>
            <Input padding=".4em" placeholder="" {...getInputProps('companyEmail')} maxLength={50} />
          </Box>
          <Box marginTop="1em">
            <Grid container wrap="nowrap">
              <Button width="50%" onClick={onClose}>Cancelar</Button>
              <Box marginRight="1em" />
              <Button width="50%" variant="contained" onClick={handleSave}>Guardar</Button>
            </Grid>
          </Box>
        </>
      )}
    </Modal>
  );
};

CompanyInfoModal.defaultProps = {
  data: null,
};

CompanyInfoModal.propTypes = {
  isEditing: bool.isRequired,
  data: object,
  open: bool.isRequired,
  onSuccess: func.isRequired,
  onClose: func.isRequired,
  setNotification: func.isRequired,
};

export default withNotifications(CompanyInfoModal);
