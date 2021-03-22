import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Card from '../../../../components/card';
import Button from '../../../../components/main/button';
import { colors } from '../../../../constants';
import Requests from './pages/request';
import styles from './styles.module.css';

const Companies = () => (
  <div>
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
        <Button variant="contained" color={colors.green}>Crear empresa</Button>
      </Grid>
    </Card>
    <Box marginTop="1em" />
    <Switch>
      <Route path="/dashboard/companies/requests" component={Requests} />
    </Switch>
  </div>
);

export default Companies;
