/* eslint-disable arrow-body-style */
import React from 'react';
import validators from '../../../../helpers/validators';
import useErrorMessage from '../../../../hooks/useErrorMessage';
import useForm from '../../../../hooks/useForm';
import RegisterView from './view';

const Register = () => {
  const { getInputProps, handleValidateForm } = useForm();
  const { errorMessage, setErrorMessage } = useErrorMessage();

  const handleRegister = (event) => {
    event.preventDefault();
    const errors = handleValidateForm({
      companyName: validators.companyName,
      userFullName: validators.userFullName,
      userEmail: validators.email,
      userPhone: validators.phone,
      companyRazonSocial: validators.razonSocial,
      companyAddress: validators.address,
      companyRFC: validators.rfc,
      companyEmail: validators.email,
    });

    if (Object.values(errors).length) return setErrorMessage(Object.values(errors)[0]);
    return null;
  };

  return (
    <RegisterView
      getInputProps={getInputProps}
      onFormSubmit={handleRegister}
      errorMessage={errorMessage}
    />
  );
};

export default Register;
