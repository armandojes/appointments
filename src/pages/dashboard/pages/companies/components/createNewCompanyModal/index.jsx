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
          <Text marginBottom="1em" textAlign="center" color={colors.blue} fontSize="1.2em" fontWeight="bold">
            {isEditing ? 'Actualizar datos de empresa' : 'Crear nueva empresa'}
          </Text>
          <ErrorMessage message={errorMessage} marginBottom="1em" />
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="Nombre de la empresa" {...getInputProps('companyName')} maxLength={50} />
          </Box>
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="Nombre del responsable" {...getInputProps('userFullName')} maxLength={50} />
          </Box>
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="Email" {...getInputProps('userEmail')} maxLength={50} />
          </Box>
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="Contraseña" {...getInputProps('password')} maxLength={30} />
          </Box>
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="Telefono" {...getInputProps('companyPhone')} maxLength={10} onlyNumbers />
          </Box>
          <Text color={colors.blue} fontWeight="bold">Datos de facturación:</Text>
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="Razón social" {...getInputProps('companyRazonSocial')} maxLength={50} />
          </Box>
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="Dirección fiscal completa" {...getInputProps('companyAddress')} maxLength={50} />
          </Box>
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="RFC" {...getInputProps('companyRFC')} maxLength={50} />
          </Box>
          <Box marginBottom=".5em">
            <Input padding=".5em" placeholder="E-mail" {...getInputProps('companyEmail')} maxLength={50} />
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
