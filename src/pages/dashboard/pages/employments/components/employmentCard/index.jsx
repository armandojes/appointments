/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { Box, Grid, IconButton } from '@material-ui/core';
import { AddBox, Delete, Edit, Visibility, VisibilityOff } from '@material-ui/icons';
import { func, string } from 'prop-types';
import React, { useState } from 'react';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import styles from './styles.module.css';

const EmploymentCard = ({ name, lastName, email, password, onDelete, onEdit, branchName, onAdd, onBranchDelete }) => {
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleShowVisivility = () => setDisplayPassword(true);
  const handleHideVisivility = () => setDisplayPassword(false);

  return (
    <Card className={styles.card}>
      <Box marginBottom="2em">
        <Grid container wrap="nowrap" justify="space-around">
          <IconButton size="small" className={styles.buttons} width="100%" onClick={onAdd}>
            <AddBox />
          </IconButton>
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
          <IconButton size="small" className={styles.buttons} width="100%" onClick={onEdit}>
            <Edit />
          </IconButton>
          <IconButton size="small" className={styles.buttons} width="100%" onClick={onDelete}>
            <Delete />
          </IconButton>
        </Grid>
      </Box>
      <Text marginTop="1em" color={colors.green} textAlign="center">Datos del empleado</Text>
      <Text color={colors.blue} fontWeight="bold" textAlign="center">{name}</Text>
      <Text color={colors.blue} fontWeight="bold" textAlign="center">{lastName}</Text>
      <Text color={colors.blue} fontWeight="bold" textAlign="center">{email}</Text>
      <Box paddingTop="1em" />
      <Text color={colors.green} fontSize="1em" textAlign="center">Contraseña</Text>
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
      <Box>
        <Text marginTop="1em" color={colors.green} textAlign="center">Sucursal</Text>
        <Text color={colors.blue} marginBottom=".3em" fontWeight="bold" textAlign="center">{branchName || 'Sin sucursal'}</Text>
      </Box>
    </Card>
  );
};

EmploymentCard.defaultProps = {
  branchName: null,
};

EmploymentCard.propTypes = {
  name: string.isRequired,
  lastName: string.isRequired,
  email: string.isRequired,
  password: string.isRequired,
  onDelete: func.isRequired,
  onEdit: func.isRequired,
  branchName: string,
  onAdd: func.isRequired,
  onBranchDelete: func.isRequired,
};

export default EmploymentCard;
