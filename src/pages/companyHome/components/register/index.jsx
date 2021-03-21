/* eslint-disable arrow-body-style */
import React from 'react';
import useForm from '../../../../hooks/useForm';
import RegisterView from './view';

const Register = () => {
  const { getInputProps } = useForm();

  return (
    <RegisterView
      getInputProps={getInputProps}
    />
  );
};

export default Register;
