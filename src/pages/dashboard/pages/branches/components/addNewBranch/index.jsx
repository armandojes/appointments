/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import useForm from 'src/hooks/useForm';
import branchesModel from 'src/core/models/branches';
import { bool, func } from 'prop-types';
import BranchGeneralInfoForm from '../../../../components/branchGeneralInfoForm';
import useNotification from '../../../../../../notifications/useSession';
import useErrorMessage from '../../../../../../hooks/useErrorMessage';

const validator = (val) => {
  if (!val) return 'Todos los capos son requeridos';
  if (val.toString().length < 3) return 'Todos los capos son requeridos';
  return false;
};

const newBranch = (props) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const setNotification = useNotification();
  const { getInputProps, values, setValues, handleValidateForm } = useForm();
  const [isLoading, setLoading] = useState(false);

  const handleCreate = async () => {
    const errors = handleValidateForm({ phonesCrud: validator, address: validator, name: validator });
    if (Object.values(errors).length) return setErrorMessage(Object.values(errors)[0]);

    setLoading(true);
    const { status } = await branchesModel.createNewBranch(values);
    if (status === 'success') {
      setLoading(false);
      props.onSuccess();
      props.onClose();
      setNotification({ message: 'Sucursal creado correcatmente', type: 'success' });
    } else {
      setLoading(false);
      props.onClose();
      setNotification({ message: 'Error al crear el sucursal', type: 'error' });
    }
    return null;
  };

  // update phones as an array
  useEffect(() => {
    const phonesCrud = values.phonesCrud || '';
    setValues((currentValues) => ({
      ...currentValues,
      phones: phonesCrud.toString().split(',').map((val) => val.toString().trim()),
    }));
  }, [values.phonesCrud]);

  return (
    <BranchGeneralInfoForm
      open={props.open}
      getInputProps={getInputProps}
      isLoading={isLoading}
      onConfirm={handleCreate}
      onClose={props.onClose}
      headerText="Crear nuevo sucursal"
      errorMessage={errorMessage}
    />
  );
};

newBranch.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onSuccess: func.isRequired,
  setNotification: func.isRequired,
};

export default newBranch;
