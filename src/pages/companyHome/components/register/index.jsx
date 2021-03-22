/* eslint-disable no-alert */
import React, { useState } from 'react';
import { createRequestForNewCompany } from '../../../../core/models/companies';
import validators from '../../../../helpers/validators';
import useErrorMessage from '../../../../hooks/useErrorMessage';
import useForm from '../../../../hooks/useForm';
import RegisterView from './view';

const Register = () => {
  const { getInputProps, handleValidateForm, values } = useForm();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    const errors = handleValidateForm({
      companyName: validators.companyName,
      userFullName: validators.userFullName,
      userEmail: validators.email,
      companyPhone: validators.phone,
      companyRazonSocial: validators.razonSocial,
      companyAddress: validators.address,
      companyRFC: validators.rfc,
      companyEmail: validators.email,
    });

    if (Object.values(errors).length) return setErrorMessage(Object.values(errors)[0]);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await createRequestForNewCompany(values);
    setIsLoading(false);
    if (response.status === 'success') alert('registrado correctamente');
    else alert(response.errorMessage);
    return null;
  };

  return (
    <RegisterView
      getInputProps={getInputProps}
      onFormSubmit={handleRegister}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  );
};

export default Register;
