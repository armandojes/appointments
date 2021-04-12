/* eslint-disable react/jsx-props-no-spreading */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { bool, func, string } from 'prop-types';
import React from 'react';
import Card from 'src/components/card';
import ErrorMessage from 'src/components/errorMessage';
import Button from 'src/components/main/button';
import Input from 'src/components/main/input';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import styles from './styles.module.css';

const View = ({ isLoading, errorMessage, getInputProps, onSave, isEditing }) => (
  <Card className={styles.card}>
    {isLoading && (
    <Grid container justify="center" alignItems="center" style={{ minHeight: '11em' }}>
      <CircularProgress />
    </Grid>
    )}
    {!isLoading && (
    <>
      <Text fontSize="1.2em" fontWeight="bold" marginBottom="2em" color={colors.blue}>{isEditing ? 'Actualizar datos de empresa' : 'Crear nueva empresa'}</Text>
      <ErrorMessage message={errorMessage} marginBottom="1em" />

      <Grid container>

        <Grid item xs={12} sm={6}>
          <Box marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>Nombre de la empresa</Text>
            <Input {...getInputProps('companyName')} maxLength={50} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>Nombre del responsable</Text>
            <Input {...getInputProps('userFullName')} maxLength={50} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>Email</Text>
            <Input placeholder="" {...getInputProps('userEmail')} maxLength={50} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box marginBottom=".2em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>Contraseña</Text>
            <Input placeholder="" {...getInputProps('password')} maxLength={30} />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Text color={colors.green} fontWeight="bold" marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">Datos de facturación:</Text>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>Teléfono</Text>
            <Input placeholder="" {...getInputProps('companyPhone')} maxLength={10} onlyNumbers />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>Razón social</Text>
            <Input placeholder="" {...getInputProps('companyRazonSocial')} maxLength={50} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>Dirección fiscal completa</Text>
            <Input placeholder="" {...getInputProps('companyAddress')} maxLength={50} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>RFC</Text>
            <Input placeholder="" {...getInputProps('companyRFC')} maxLength={50} />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box marginBottom=".5em" paddingRight=".5em" paddingLeft=".5em">
            <Text fontWeight="bold" fontSize="1em" color={colors.blue}>E-mail</Text>
            <Input placeholder="" {...getInputProps('companyEmail')} maxLength={50} />
          </Box>
        </Grid>

      </Grid>
      <Box marginTop="2em">
        <Grid container wrap="nowrap">
          <Button width="50%" variant="contained" onClick={onSave}>Guardar</Button>
        </Grid>
      </Box>
    </>
    )}
  </Card>
);

View.propTypes = {
  isLoading: bool.isRequired,
  errorMessage: string.isRequired,
  getInputProps: func.isRequired,
  onSave: func.isRequired,
  isEditing: bool.isRequired,
};

export default View;
