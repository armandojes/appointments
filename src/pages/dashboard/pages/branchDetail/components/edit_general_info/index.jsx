/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import Modal from 'src/components/modal';
import Text from 'src/components/main/text';
import useForm from 'src/hooks/useForm';
import Input from 'src/components/main/input';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { bool, func, object } from 'prop-types';
import { colors } from 'src/constants';
import Button from 'src/components/main/button';
import branchesModel from 'src/core/models/branches';
import withNotifications from '../../../../../../highOrderComponents/withNotification';

const EditGeneralInfoModal = (props) => {
  const { getInputProps, values, setValues } = useForm();
  const [isLoading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const { status } = await branchesModel.UpdateGeneralInfo(props.data.id, values);
    if (status === 'success') {
      setLoading(false);
      props.onSuccess();
      props.onClose();
      props.setNotification({ message: 'Datos actualizados correctamente', type: 'success' });
    } else {
      setLoading(false);
      props.onClose();
      props.setNotification({ message: 'Error al actializar los datos', type: 'error' });
    }
  };

  // update phones as an array
  useEffect(() => {
    const phonesCrud = values.phonesCrud || '';
    setValues((currentValues) => ({
      ...currentValues,
      phones: phonesCrud.toString().split(',').map((val) => val.toString().trim()),
    }));
  }, [values.phonesCrud]);

  // fill form data
  useEffect(() => {
    setValues({
      ...props.data,
      phonesCrud: props.data.phones ? props.data.phones.join(', ') : '',
    });
  }, [props.data]);

  return (
    <Modal open={props.open}>
      {isLoading && (
        <Grid container alignItems="center" justify="center" style={{ minHeight: '200px' }}>
          <CircularProgress />
        </Grid>
      )}
      {!isLoading && (
        <>
          <Box marginBottom="1.5em">
            <Text fontWeight="bold" color={colors.green} fontSize="1.2em">Informacion General</Text>
          </Box>
          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Nombre</Text>
            <Input {...getInputProps('name')} />
          </Box>
          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Dirección</Text>
            <Input {...getInputProps('address')} />
          </Box>
          <Box marginBottom="2em">
            <Text color={colors.blue} mb=".2em">Teléfonos (separadas por coma)</Text>
            <Input {...getInputProps('phonesCrud')} placeholder="111111, 222222, 333333" />
          </Box>
          <Grid container wrap="nowrap">
            <Button color={colors.blue} width="50%" onClick={props.onClose}>Cancelar</Button>
            <Box padding=".5em" />
            <Button color={colors.blue} width="50%" variant="contained" onClick={handleUpdate}>Guardar</Button>
          </Grid>
        </>
      )}
    </Modal>
  );
};

EditGeneralInfoModal.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onSuccess: func.isRequired,
  data: object.isRequired,
  setNotification: func.isRequired,
};

export default withNotifications(EditGeneralInfoModal);
