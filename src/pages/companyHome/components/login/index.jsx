/* eslint-disable arrow-body-style */
import { Box } from '@material-ui/core';
import React from 'react';
import Button from 'src/components/main/button';
import InputInderLine from 'src/components/main/inputunderLine';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import styles from './styles.module.css';

const Login = () => {
  return (
    <div>
      <Text fontSize="2.2em" color={colors.blue} fontWeight="900">Bienvenido</Text>
      <Text fontSize="" color={colors.green} fontWeight="bold">Si ya tienes cuenta activa, ingresa aquí:</Text>
      <form className={styles.form}>
        <InputInderLine type="text" placeholder="User" />
        <Box paddingTop=".5em" />
        <InputInderLine type="text" placeholder="password" />
        <Box paddingTop="1.5em" />
        <div className={styles.buttonWrapper}>
          <Button width="10em" variant="contained" color={colors.blue} borderRadius="2em">Entrar</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
