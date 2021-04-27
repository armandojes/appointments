/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import useForm from 'src/hooks/useForm';
import { loginWithEmailAndPAssword } from '../../../../core/models/auth';
import validators from '../../../../helpers/validators';
import useErrorMessage from '../../../../hooks/useErrorMessage';
import LoginView from './loginView';

const Login = () => {
  const { getInputProps, handleValidateForm, values } = useForm();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState();

  const handleTogglePasswordVisivility = () => setShowPassword((prevState) => !prevState);

  const handleLogin = async (event) => {
    event.preventDefault();
    const errors = handleValidateForm({
      email: validators.email,
      password: validators.password,
    });
    if (Object.values(errors).length) return setErrorMessage(Object.values(errors)[0]);
    setLoading(true);
    const response = await loginWithEmailAndPAssword({ email: values.email, password: values.password });
    if (response.status === 'error') {
      setErrorMessage(response.errorMessage);
      setLoading(false);
    }
    return null;
  };

  return (
    <LoginView
      getInputProps={getInputProps}
      onLogin={handleLogin}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onTogglePasswordVisivility={handleTogglePasswordVisivility}
      showPassword={showPassword}
    />
  );
};

export default Login;
