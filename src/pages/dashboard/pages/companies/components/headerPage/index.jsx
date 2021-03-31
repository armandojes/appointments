import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Card from 'src/components/card';
import Button from 'src/components/main/button';
import { colors } from 'src/constants';
import { func } from 'prop-types';
import styles from './styles.module.css';

const HeaderCompanies = ({ onCreate }) => (
  <>
    <Card>
      <Grid container justify="space-between" alignItems="center">
        <Box display="flex">
          <NavLink exact className={styles.link} activeClassName={styles.activeLink} to="/dashboard/companies">
            Empresas
          </NavLink>
          <Box marginLeft="2em" />
          <NavLink exact className={styles.link} activeClassName={styles.activeLink} to="/dashboard/companies/requests">
            Solicitudes
          </NavLink>
        </Box>
        {onCreate && (
          <Button onClick={onCreate} variant="contained" color={colors.green}>Crear empresa</Button>
        )}
      </Grid>
    </Card>
    <Box marginTop="1em" />
  </>
);

HeaderCompanies.defaultProps = {
  onCreate: null,
};

HeaderCompanies.propTypes = {
  onCreate: func,
};

export default HeaderCompanies;
