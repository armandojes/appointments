/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import useForm from 'src/hooks/useForm';
import branchesModel from 'src/core/models/branches';
import { bool, func, object } from 'prop-types';
import withNotifications from '../../../../../../highOrderComponents/withNotification';
import BranchGeneralInfoForm from '../../../../components/branchGeneralInfoForm';

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
  setNotification: func.isRequired,
};

export default withNotifications(EditGeneralInfoModal);
