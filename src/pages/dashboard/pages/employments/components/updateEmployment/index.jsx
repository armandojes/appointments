/* eslint-disable react/forbid-prop-types */
import { func, bool, object } from 'prop-types';
import React, { useEffect, useState } from 'react';
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

const UpdateEmployment = ({ onClose, open, onSuccess, setNotification, initialData }) => {
  const { getInputProps, handleValidateForm, values, setValues } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUpdate = async () => {
    const errors = handleValidateForm(valiodators);
    if (Object.values(errors).length) {
      setErrorMessage(Object.values(errors)[0]);
      setTimeout(setErrorMessage, 7000);
      return null;
    }
    setLoading(true);
    const response = await employments.updateEmployment(initialData.id, values);
    if (response.status === 'success') {
      setNotification({ type: 'success', message: 'Datos del empleado actualizado correctamente' });
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } else {
      setErrorMessage(response.errorMessage);
    }
    setLoading(false);
    return null;
  };

  useEffect(() => {
    setValues({ ...initialData });
  }, [initialData]);

  return (
    <EmploymentForm
      headerText="Actualizar datos de empleado"
      getInputProps={getInputProps}
      onClose={onClose}
      open={open}
      isLoading={isLoading}
      onSave={handleUpdate}
      errorMessage={errorMessage}
    />
  );
};

UpdateEmployment.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  onSuccess: func.isRequired,
  setNotification: func.isRequired,
  initialData: object.isRequired,
};

export default withNotifications(UpdateEmployment);
