/* eslint-disable no-unused-vars */
import { Box, Grid, IconButton } from '@material-ui/core';
import { Delete, Edit, Visibility, VisibilityOff } from '@material-ui/icons';
import { string } from 'prop-types';
import React, { useState } from 'react';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import styles from './styles.module.css';

const EmploymentCard = ({ name, lastName, email, password }) => {
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleShowVisivility = () => setDisplayPassword(true);
  const handleHideVisivility = () => setDisplayPassword(false);

  return (
    <Card className={styles.card}>
      <Text marginTop="2em" color={colors.green} fontSize=".8em" textAlign="center">Nombre</Text>
      <Text color={colors.blue} fontWeight="bold" textAlign="center">{name}</Text>
      <Text color={colors.blue} marginBottom=".3em" fontWeight="bold" textAlign="center">{lastName}</Text>
      <Text color={colors.green} fontSize=".8em" textAlign="center">correo</Text>
      <Text color={colors.blue} marginBottom=".3em" fontWeight="bold" textAlign="center">{email}</Text>
      <Text color={colors.green} fontSize=".8em" textAlign="center">Contraseña</Text>
      {displayPassword && (
        <Grid container alignItems="center" justify="center">
          <Text color={colors.blue} marginBottom=".3em" fontWeight="bold" textAlign="center">{password}</Text>
        </Grid>
      )}
      {!displayPassword && (
        <Grid container alignItems="center" justify="center">
          <Text color={colors.blue} marginBottom=".3em" fontWeight="bold" textAlign="center">
            &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
          </Text>
        </Grid>
      )}
      <Box position="absolute" top=".5em" right=".5em">
        <Grid container wrap="nowrap" justify="center">
          {displayPassword && (
            <IconButton size="small" className={styles.buttons} width="100%" onClick={handleHideVisivility}>
              <VisibilityOff />
            </IconButton>
          )}
          {!displayPassword && (
            <IconButton size="small" className={styles.buttons} width="100%" onClick={handleShowVisivility}>
              <Visibility />
            </IconButton>
          )}
          <IconButton size="small" className={styles.buttons} width="100%">
            <Edit />
          </IconButton>
          <IconButton size="small" className={styles.buttons} width="100%">
            <Delete />
          </IconButton>
        </Grid>
      </Box>
    </Card>
  );
};

EmploymentCard.propTypes = {
  name: string.isRequired,
  lastName: string.isRequired,
  email: string.isRequired,
  password: string.isRequired,
};

export default EmploymentCard;
