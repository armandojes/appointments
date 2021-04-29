import React, { useState } from 'react';
import { Box, Grid, Hidden } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Card from 'src/components/card';
import Button from 'src/components/main/button';
import { colors } from 'src/constants';
import { func, number } from 'prop-types';
import styles from './styles.module.css';
import useFetch from '../../../../../../hooks/useFetch';
import companies from '../../../../../../core/models/companies';

const HeaderCompanies = ({ onCreate, counter }) => {
  const [counterFromState, setCounter] = useState(0);

  useFetch(async () => {
    const list = await companies.getRequests();
    setCounter(list.length);
  }, [counter]);

  return (
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
              {(!!counterFromState || !!counter) && <div className={styles.counter}>{counterFromState || counter}</div>}
            </NavLink>
          </Box>
          {onCreate && (
            <Button onClick={onCreate} variant="contained" color={colors.green}>Crear <Hidden xsDown>empresa</Hidden></Button>
          )}
        </Grid>
      </Card>
      <Box marginTop="1em" />
    </>
  );
};

HeaderCompanies.defaultProps = {
  onCreate: null,
  counter: 0,
};

HeaderCompanies.propTypes = {
  onCreate: func,
  counter: number,
};

export default HeaderCompanies;
