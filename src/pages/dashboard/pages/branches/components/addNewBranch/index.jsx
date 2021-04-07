/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import useForm from 'src/hooks/useForm';
import branchesModel from 'src/core/models/branches';
import { bool, func } from 'prop-types';
import BranchGeneralInfoForm from '../../../../components/branchGeneralInfoForm';
import useNotification from '../../../../../../notifications/useSession';

const newBranch = (props) => {
  const setNotification = useNotification();
  const { getInputProps, values, setValues } = useForm();
  const [isLoading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const { status } = await branchesModel.createNewBranch(values);
    if (status === 'success') {
      setLoading(false);
      props.onSuccess();
      props.onClose();
      setNotification({ message: 'Datos actualizados correctamente', type: 'success' });
    } else {
      setLoading(false);
      props.onClose();
      setNotification({ message: 'Error al actializar los datos', type: 'error' });
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

  return (
    <BranchGeneralInfoForm
      open={props.open}
      getInputProps={getInputProps}
      isLoading={isLoading}
      onConfirm={handleUpdate}
      onClose={props.onClose}
      headerText="Crear nuevo sucursal"
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
