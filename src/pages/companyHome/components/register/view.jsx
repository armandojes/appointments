/* eslint-disable react/jsx-props-no-spreading */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { Phone, WhatsApp } from '@material-ui/icons';
import { bool, func, string } from 'prop-types';
import React from 'react';
import Button from 'src/components/main/button';
import Input from 'src/components/main/input';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import ErrorMessage from '../../../../components/errorMessage';
import styles from './styles.module.css';

const RegisterView = ({ getInputProps, onFormSubmit, errorMessage, isLoading, created }) => (
  <div>
    {!isLoading && !created && (
      <>
        <Text fontSize="2.2em" color={colors.blue} fontWeight="900">Soy nueva Empresa</Text>
        <Text fontSize="" color={colors.green} fontWeight="bold">Hemos recibido su solicitud, en breve recibirá un correo electrónico con los datos de acceso a su cuenta.</Text>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <ErrorMessage message={errorMessage} />
          <Box paddingTop=".5em">
            <Input
              {...getInputProps('companyName')}
              type="text"
              placeholder="Nombre de la empresa"
              variant="underline"
              maxLength={50}
            />
          </Box>
          <Box paddingTop=".5em">
            <Input
              {...getInputProps('userFullName')}
              type="text"
              placeholder="Nombre del responsable"
              variant="underline"
              maxLength={50}
            />
          </Box>
          <Box paddingTop=".5em">
            <Input
              {...getInputProps('userEmail')}
              type="text"
              placeholder="E-mail"
              variant="underline"
              maxLength={50}
            />
          </Box>
          <Box paddingTop=".5em">
            <Input
              {...getInputProps('companyPhone')}
              type="text"
              placeholder="Teléfono"
              variant="underline"
              maxLength={10}
              onlyNumbers
            />
          </Box>
          <Box marginTop=".5em">
            <Text color={colors.blue} fontWeight="bold" fontSize="1.1em">Datos de facturación:</Text>
          </Box>
          <Box paddingTop=".5em">
            <Input
              {...getInputProps('companyRazonSocial')}
              type="text"
              placeholder="Razón Social"
              variant="underline"
              maxLength={50}
            />
          </Box>
          <Box paddingTop=".5em">
            <Input
              maxLength={100}
              {...getInputProps('companyAddress')}
              type="text"
              placeholder="Dirección fiscal completa"
              variant="underline"
            />
          </Box>
          <Box paddingTop=".5em">
            <Input
              maxLength={50}
              {...getInputProps('companyRFC')}
              type="text"
              placeholder="RFC:"
              variant="underline"
            />
          </Box>
          <Box paddingTop=".5em">
            <Input
              maxLength={50}
              {...getInputProps('companyEmail')}
              type="text"
              placeholder="E-mail"
              variant="underline"
            />
          </Box>

          <Box paddingTop="1.5em">
            <div className={styles.buttonWrapper}>
              <Button type="submit" width="10em" variant="contained" color={colors.blue} borderRadius="2em">Registrarme</Button>
            </div>
          </Box>
          <Box marginTop="1.5em">
            <Text fontWeight="bold" color={colors.green}>*Al darte de alta, te notificaremos por correo, tu acceso a la agenda.</Text>
            <Text fontWeight="bold" color={colors.green}>*Todos los campos son obligatorios.</Text>
          </Box>
          <Box marginTop="4em" marginBottom="2em">
            <Grid container justify="center" alignItems="center">
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
      </>
    )}
    {!isLoading && created && (
      <div className={styles.successWrapper}>
        <Text
          display="flex"
          alignItems="center"
          fontSize="2.2em"
          color={colors.blue}
          fontWeight="900"
          marginBottom="1em"
        >
          Registrado correctamente
        </Text>
        <Text fontSize="1.5em" color={colors.green} fontWeight="bold">
          Hemos recibido su solicitud, en breve recibirá un correo electrónico con los datos de acceso a su cuenta.
        </Text>
      </div>
    )}
    {isLoading && (
      <div className={styles.loadingWrapper}>
        <CircularProgress />
      </div>
    )}
  </div>
);

RegisterView.propTypes = {
  getInputProps: func.isRequired,
  onFormSubmit: func.isRequired,
  errorMessage: string.isRequired,
  isLoading: bool.isRequired,
  created: bool.isRequired,
};

export default RegisterView;
