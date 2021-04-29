/* eslint-disable no-unused-vars */
import Modal from 'src/components/modal';
import React, { useEffect, useState } from 'react';
import { array, bool, string } from 'prop-types';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import Text from '../../../../../../components/main/text';
import { colors, payoutTypes } from '../../../../../../constants';
import styles from './styles.module.css';
import { updateMethosPay } from '../../../../../../core/models/companies';
import Button from '../../../../../../components/main/button';
import useNotification from '../../../../../../notifications/useSession';

const MethodsPayModal = ({ open, onClose, name, methodsPay, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [methodspaySelected, setMethodsPay] = useState(methodsPay);
  const setNotification = useNotification();

  useEffect(() => {
    setMethodsPay(methodsPay);
  }, [methodsPay]);

  const handleMethodPayClick = (methodPay) => {
    if (methodspaySelected.includes(methodPay)) {
      setMethodsPay((pays) => pays.filter((c) => c !== methodPay));
    } else {
      setMethodsPay((methdos) => [...methdos, methodPay]);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const response = await updateMethosPay(id, methodspaySelected);
    if (response.status === 'success') {
      setNotification({ type: 'success', message: 'Métodos de pago actualizado' });
    } else {
      setNotification({ type: 'error', message: response.errorMessage });
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      {isLoading && (
        <Box justifyContent="center" display="flex" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Box>
          <Text textAlign="center" fontSize="1.2em" color={colors.blue} fontWeight="bold">{name}</Text>

          <Grid justify="center" container>
            <Box marginTop="2em">
              <Text color={colors.green} fontWeight="bold" fontSize="1.2em">Métodos de pago</Text>
              {Object.keys(payoutTypes).map((currentKey) => (
                <div className={styles.checkboxRow} onClick={() => handleMethodPayClick(currentKey)} role="button">
                  <div className={`${styles.checkbox} ${methodspaySelected.includes(currentKey) ? styles.checkboxSleected : ''}`}>
                    <Check />
                  </div>
                  <Text>{payoutTypes[currentKey]}</Text>
                </div>
              ))}
            </Box>
          </Grid>
          <Box display="flex" justifyContent="center" marginTop="3em">
            <Button width="45%" onClick={onClose}>Cancelar</Button>
            <Box padding=".5em" />
            <Button variant="contained" width="45%" onClick={handleUpdate}>Aceptar</Button>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

MethodsPayModal.propTypes = {
  open: bool.isRequired,
  onClose: bool.isRequired,
  name: string.isRequired,
  methodsPay: array.isRequired,
  id: string.isRequired,
};

export default MethodsPayModal;
