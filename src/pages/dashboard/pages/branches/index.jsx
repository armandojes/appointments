/* eslint-disable no-unused-vars */
import { Settings } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import Empty from '../../../../components/empty';
import Loading from '../../../../components/loading';
import Text from '../../../../components/main/text';
import { colors } from '../../../../constants';
import branchesModel from '../../../../core/models/branches';
import useFetch from '../../../../hooks/useFetch';
import styles from './styles.module.css';
import Button from '../../../../components/main/button';
import AddNewBranch from './components/addNewBranch';
import Card from '../../../../components/card';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const handleFecth = async () => {
    const branchesList = await branchesModel.list();
    setBranches(branchesList);
    setLoading(false);
  };

  useFetch(handleFecth, []);

  return (
    <div>
      <AddNewBranch
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleFecth}
      />
      {isLoading && (<Loading />)}
      {!isLoading && (
        <div className={styles.content}>
          <Box marginBottom="1em">
            <Card>
              <Grid container justify="space-between" alignItems="center">
                <Text fontSize="1.5em">Sucursales</Text>
                <Button
                  variant="contained"
                  color={colors.green}
                  onClick={handleModalOpen}
                >Crear sucursal
                </Button>
              </Grid>
            </Card>
          </Box>
          {(!branches || !branches.length) && (
            <Empty message="Aun no tienes sucursales" />
          )}
          {!!branches && !!branches.length && branches.map((branch) => (
            <Link to={`/dashboard/branches/${branch.id}`} className={styles.itemWrapper}>
              <Text fontWeight="bold" color={colors.blue} flexGrow="1">{branch.name}</Text>
              <Button variant="outlined" color={colors.green}>
                <Settings />
                Ajustes
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Branches;
