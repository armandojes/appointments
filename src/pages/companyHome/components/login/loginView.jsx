import { Box, CircularProgress, Grid } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { bool, func, string } from 'prop-types';
import React from 'react';
import Button from 'src/components/main/button';
import Input from 'src/components/main/input';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import ErrorMessage from '../../../../components/errorMessage';
import styles from './styles.module.css';

const LoginView = ({ getInputProps, onLogin, errorMessage, isLoading, onTogglePasswordVisivility, showPassword }) => (
  <div>
    {!isLoading && (
      <>
        <Text fontSize="2.2em" color={colors.blue} fontWeight="900">Bienvenido</Text><Text fontSize="" color={colors.green} fontWeight="bold">Si ya tienes cuenta activa, ingresa aquí:</Text>
        <form className={styles.form} onSubmit={onLogin}>
          <ErrorMessage message={errorMessage} />
          <Input variant="underline" type="text" placeholder="Email" {...getInputProps('email')} maxLength={50} />
          <Box paddingTop=".5em" />
          <Box position="relative">
            <Input variant="underline" type={showPassword ? 'text' : 'password'} placeholder="Password" {...getInputProps('password')} maxLength={50} />
            {showPassword && <Visibility className={styles.visisvilityIcon} onClick={onTogglePasswordVisivility} />}
            {!showPassword && <VisibilityOff className={styles.visisvilityIcon} onClick={onTogglePasswordVisivility} />}
          </Box>
          <Box paddingTop="1.5em" />
          <div className={styles.buttonWrapper}>
            <Button width="10em" variant="contained" color={colors.blue} borderRadius="2em" type="submit">Entrar</Button>
          </div>
        </form>
      </>
    )}
    {isLoading && (
      <>
        <Text fontSize="2.2em" color={colors.blue} fontWeight="900">Bienvenido</Text>
        <Text fontSize="" color={colors.green} fontWeight="bold">Si ya tienes cuenta activa, ingresa aquí:</Text>
        <Grid container justify="center" alignItems="center" style={{ minHeight: '250px' }}>
          <CircularProgress />
        </Grid>
      </>
    )}
  </div>
);

LoginView.propTypes = {
  getInputProps: func.isRequired,
  onLogin: func.isRequired,
  errorMessage: string.isRequired,
  isLoading: bool.isRequired,
  onTogglePasswordVisivility: func.isRequired,
  showPassword: bool.isRequired,
};

export default LoginView;
