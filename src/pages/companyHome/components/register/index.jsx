/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { Box, Grid } from '@material-ui/core';
import { Phone, WhatsApp } from '@material-ui/icons';
import React from 'react';
import Button from 'src/components/main/button';
import InputInderLine from 'src/components/main/inputunderLine';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import styles from './styles.module.css';

const Register = () => {
  return (
    <div>
      <Text fontSize="2.2em" color={colors.blue} fontWeight="900">Soy nueva Empresa</Text>
      <Text fontSize="" color={colors.green} fontWeight="bold">No tienes cuenta, da de alta tu empresa llenando los siguientes datos:</Text>
      <form className={styles.form}>

        <Box paddingTop=".5em">
          <InputInderLine type="text" placeholder="Nombre de la empresa" />
        </Box>

        <Box paddingTop=".5em">
          <InputInderLine type="text" placeholder="Nombre del responsable" />
        </Box>

        <Box paddingTop=".5em">
          <InputInderLine type="text" placeholder="E-mail" />
        </Box>

        <Box paddingTop=".5em">
          <InputInderLine type="text" placeholder="Teléfono" />
        </Box>
        <Box marginTop=".5em">
          <Text color={colors.blue} fontWeight="bold" fontSize="1.1em">Datos de facturación:</Text>
        </Box>
        <Box paddingTop=".5em">
          <InputInderLine type="text" placeholder="Razón Social" />
        </Box>

        <Box paddingTop=".5em">
          <InputInderLine type="text" placeholder="Dirección fiscal completa" />
        </Box>

        <Box paddingTop=".5em">
          <InputInderLine type="text" placeholder="RFC:" />
        </Box>

        <Box paddingTop=".5em">
          <InputInderLine type="text" placeholder="E-mail" />
        </Box>

        <InputInderLine type="text" placeholder="password" />
        <Box paddingTop="1.5em">
          <div className={styles.buttonWrapper}>
            <Button width="10em" variant="contained" color={colors.blue} borderRadius="2em">Registrarme</Button>
          </div>
        </Box>

        <Box marginTop="1.5em">
          <Text fontWeight="bold" color={colors.green}>*Al darte de alta, te notificaremos por correo, tu acceso a la agenda.</Text>
          <Text fontWeight="bold" color={colors.green}>*Todos los campos son obligatorios.</Text>
        </Box>

        <Box marginTop="4em" marginBottom="2em">
          <Grid container justify="center" alignItems center>
            <div className={styles.contactWrapper}>
              <Phone className={styles.contactIcon} />
              Tel. 442 213 0898
            </div>
            <Box marginRight="2em" />
            <div className={styles.contactWrapper}>
              <WhatsApp className={styles.contactIcon} />
              WhatsApp
            </div>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default Register;
