/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Box, Grid, IconButton } from '@material-ui/core';
import { Delete, Edit, Visibility, VisibilityOff } from '@material-ui/icons';
import { func, string } from 'prop-types';
import React, { useState } from 'react';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import branchIconSrc from 'src/assets/branch2.png';
import styles from './styles.module.css';
import Caption from '../../../../../../components/caption';

const EmploymentCard = ({ name, lastName, email, password, onDelete, onEdit, branchName, onAdd }) => {
  const [displayPassword, setDisplayPassword] = useState(false);

  const toggleVisivilityPassword = () => setDisplayPassword((prevState) => !prevState);

  return (
    <Card className={styles.card}>
      <Box marginBottom="2em">
        <Grid container wrap="nowrap" justify="space-around">
          <Caption message="Sucursal">
            <IconButton size="small" className={styles.buttons} width="100%" onClick={onAdd}>
              <img src={branchIconSrc} alt="icono para agregar empresa" onClick={onAdd} className={styles.iconPng} />
            </IconButton>
          </Caption>

          <Caption message={displayPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            <IconButton size="small" className={styles.buttons} width="100%" onClick={toggleVisivilityPassword}>
              {displayPassword && <VisibilityOff />}
              {!displayPassword && <Visibility />}
            </IconButton>
          </Caption>
          <Caption message="Editar">
            <IconButton size="small" className={styles.buttons} width="100%" onClick={onEdit}>
              <Edit />
            </IconButton>
          </Caption>
          <Caption message="Eliminar">
            <IconButton size="small" className={styles.buttons} width="100%" onClick={onDelete}>
              <Delete />
            </IconButton>
          </Caption>
        </Grid>
      </Box>
      <Text marginTop="1em" color={colors.green} textAlign="center">Datos del encargado de sucursal</Text>
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
};

export default EmploymentCard;
