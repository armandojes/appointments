/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { Box, Grid } from '@material-ui/core';
import { func, number, string } from 'prop-types';
import React from 'react';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import { getDisplayDate } from 'src/helpers/dates';
import Button from '../../../../../../components/main/button';

const Requestcard = ({ companyAddress, companyEmail, companyName, companyPhone, companyRFC, companyRazonSocial, createdAt, userEmail, userFullName, onDelete, onAprov }) => (
  <Card>
    <Box textAlign="center">
      <Text lineHeight="1.4em" color={colors.green}>Fecha</Text>
      <Text lineHeight="1.4em" color={colors.blue}>{getDisplayDate(createdAt)}</Text>
      <Box marginBottom="1.5em" />
      <Text lineHeight="1.4em" color={colors.green}>Datos del usuario</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{userFullName}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{userEmail}</Text>
      <Box marginBottom="1.5em" />
      <Text lineHeight="1.4em" color={colors.green}>Datos de la empresa</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyName}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyEmail}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyPhone}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyAddress}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyRFC}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyRazonSocial}</Text>
      <Box mt="2em">
        <Grid container justify="center">
          <Button onClick={onDelete} color={colors.green} padding=".4em" width="8em">Eliminar</Button>
          <Box pr="1em" />
          <Button onClick={onAprov} color={colors.green} padding=".4em" width="8em" variant="contained">Habilitar</Button>
        </Grid>
      </Box>
    </Box>
  </Card>
);

Requestcard.propTypes = {
  companyAddress: string.isRequired,
  companyEmail: string.isRequired,
  companyName: string.isRequired,
  companyPhone: number.isRequired,
  companyRFC: string.isRequired,
  companyRazonSocial: string.isRequired,
  createdAt: string.isRequired,
  userEmail: string.isRequired,
  userFullName: string.isRequired,
  onDelete: func.isRequired,
  onAprov: func.isRequired,
};

export default Requestcard;
