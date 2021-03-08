/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { func, bool } from 'prop-types';
import React, { useState } from 'react';
import useForm from 'src/hooks/useForm';
import employments from '../../../../../../core/models/employments';
import withNotifications from '../../../../../../highOrderComponents/withNotification';
import EmploymentForm from '../employmentForm';

const valiodators = {
  name: (val = '') => (val.toString().length < 3 ? 'El nombre no es válido' : false),
  lastName: (val = '') => (val.toString().length < 3 ? 'el apellido no es válido' : false),
  email: (val = '') => (val.toString().length < 3 ? 'El correo no es válido' : false),
  password: (val = '') => (val.toString().length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : false),
};

const NewEmployment = ({ onClose, open, onSuccess, setNotification }) => {
  const { getInputProps, handleValidateForm, values } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSave = async () => {
    const errors = handleValidateForm(valiodators);
    if (Object.values(errors).length) {
      setErrorMessage(Object.values(errors)[0]);
      setTimeout(setErrorMessage, 7000);
      return null;
    }
    setLoading(true);
    const response = await employments.createNewEmployment(values);
    if (response.status === 'success') {
      setNotification({ type: 'success', message: 'empleado creado correctamente' });
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } else {
      setErrorMessage(response.errorMessage);
    }
    setLoading(false);
    return null;
  };

  return (
    <EmploymentForm
      headerText="Nuevo Empleado"
      getInputProps={getInputProps}
      onClose={onClose}
      open={open}
      isLoading={isLoading}
      onSave={handleSave}
      errorMessage={errorMessage}
    />
  );
};

NewEmployment.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  onSuccess: func.isRequired,
  setNotification: func.isRequired,
};

export default withNotifications(NewEmployment);
