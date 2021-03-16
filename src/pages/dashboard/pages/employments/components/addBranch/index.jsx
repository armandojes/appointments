/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import Modal from 'src/components/modal';
import React, { useEffect, useState } from 'react';
import { bool, func, string } from 'prop-types';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import employmentsModel from 'src/core/models/employments';
import useFetch from 'src/hooks/useFetch';
import branchesModel from 'src/core/models/branches';
import { Box, CircularProgress, Grid, IconButton } from '@material-ui/core';
import Card from 'src/components/card';
import Button from 'src/components/main/button';
import { Close } from '@material-ui/icons';
import withNotifications from 'src/highOrderComponents/withNotification';
import styles from './styles.module.css';

const AddBranchIntoEmployment = ({ open, onClose, employmentId, setNotification, onSuccess }) => {
  const [state, setState] = useState({ isLoading: true, branches: [] });

  useFetch(async () => {
    const allBranches = await branchesModel.list();
    const { branches = [] } = await employmentsModel.getSingle(employmentId);
    const branchesFiltered = allBranches.filter((currentBranch) => !branches.includes(currentBranch.id));
    setState({ isLoading: false, branches: branchesFiltered });
  }, [employmentId]);

  const handleAdd = async (branchId) => {
    setState((currentState) => ({ ...currentState, isLoading: true }));
    const { status } = await employmentsModel.addBranch(employmentId, branchId);
    if (status === 'success') {
      setNotification({ type: 'success', message: 'Sucursal asignado al empleado correctamente' });
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    }
  };

  // reset state when close modal
  useEffect(() => {
    setTimeout(() => {
      if (!open) {
        setState({ isLoading: true, branches: [] });
      }
    }, 1000);
  }, [open]);

  return (
    <Modal open={open} className={styles.modal}>
      <IconButton className={styles.closeIcon} onClick={onClose}>
        <Close />
      </IconButton>
      {!state.isLoading && !!state.branches.length && (
        <Box className={styles.body}>
          <Text textAlign="center" fontSize="1.2em" color={colors.blue}>Agregar nuevo sucursal</Text>
          <Box marginTop="2em">
            <Grid container>
              {state.branches.map((currentBranch) => (
                <Grid item xs={12} sm={6}>
                  <Box padding=".5em">
                    <Card className={styles.cardBranch}>
                      <Text color={colors.green} textAlign="center" fontWeight="bold">{currentBranch.name}</Text>
                      <Box>
                        <Button className={styles.button} onClick={() => handleAdd(currentBranch.id)}>Agregar</Button>
                      </Box>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
      {state.isLoading && (
        <Grid container justify="center" alignItems="center" style={{ minHeight: '300px' }}>
          <CircularProgress />
        </Grid>
      )}
      {!state.isLoading && !state.branches.length && (
        <Grid container justify="center" alignItems="center" style={{ minHeight: '300px' }}>
          <Text textAlign="center" lineHeight="1.7em" fontSize="1.3em" color="rgb(15 175 171 / 55%)">No hay sucursales <br /> disponibles</Text>
        </Grid>
      )}
    </Modal>
  );
};

AddBranchIntoEmployment.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  employmentId: string.isRequired,
  onSuccess: func.isRequired,
  setNotification: func.isRequired,
};

export default withNotifications(AddBranchIntoEmployment);
