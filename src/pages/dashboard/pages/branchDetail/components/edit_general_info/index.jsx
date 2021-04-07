/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import useForm from 'src/hooks/useForm';
import branchesModel from 'src/core/models/branches';
import { bool, func, object } from 'prop-types';
import BranchGeneralInfoForm from '../../../../components/branchGeneralInfoForm';
import useNotification from '../../../../../../notifications/useSession';

const EditGeneralInfoModal = (props) => {
  const setNotification = useNotification();
  const { getInputProps, values, setValues } = useForm();
  const [isLoading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const { status } = await branchesModel.UpdateGeneralInfo(props.data.id, values);
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

  // fill form data
  useEffect(() => {
    setValues({
      ...props.data,
      phonesCrud: props.data.phones ? props.data.phones.join(', ') : '',
    });
  }, [props.data]);

  return (
    <BranchGeneralInfoForm
      open={props.open}
      getInputProps={getInputProps}
      isLoading={isLoading}
      onConfirm={handleUpdate}
      onClose={props.onClose}
    />
  );
};

EditGeneralInfoModal.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onSuccess: func.isRequired,
  data: object.isRequired,
};

export default EditGeneralInfoModal;
