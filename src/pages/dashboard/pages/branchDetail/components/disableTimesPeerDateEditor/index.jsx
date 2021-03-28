/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { bool, func, instanceOf, string } from 'prop-types';
import React, { useState } from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import Text from 'src/components/main/text';
import Modal from 'src/components/modal';
import { colors, days } from 'src/constants';
import branchesModel from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import { stringDateToDate, toStringDate, toStringTime } from 'src/helpers/dates';
import Button from 'src/components/main/button';
import styles from './styles.module.css';
import DisplayScheduleStatus from '../disabledDatesSelector';
import withNotifications from '../../../../../../highOrderComponents/withNotification';

const DisableTimesPerDateEditor = ({ open, stringDate, branchId, onClose, setNotification, onSuccess }) => {
  const date = stringDateToDate(stringDate);
  const [times, setTimes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (stringDate) {
      setLoading(true);
      const respsonse = await branchesModel.getTimesStatusPerDate(branchId, date);
      setTimes(respsonse);
      setLoading(false);
    }
  };

  const handleScheduleClick = ({ time }) => {
    const newScheduleList = times.map((currentTime) => {
      if (toStringTime(currentTime.time) === toStringTime(time)) currentTime.isDisabled = !currentTime.isDisabled;
      return currentTime;
    });
    setTimes(newScheduleList);
  };

  useFetch(handleFetch, [toStringDate(date), open]);

  const handleUpdate = async () => {
    setLoading(true);
    const { status, errorMessage } = await branchesModel.updateTimesStatusPerDate(branchId, date, times);
    if (status === 'success') {
      setNotification({ type: 'success', message: 'Horarios inhabiles actualizado correctamente' });
      await onSuccess();
    } else setNotification({ type: 'error', message: errorMessage });
    setLoading(false);
    onClose();
  };

  return (
    <Modal className={styles.modalCard} open={open}>
      {isLoading && (
        <Grid container justify="center" style={{ minHeight: '250px' }} alignItems="center">
          <CircularProgress />
        </Grid>
      )}
      {!isLoading && (
        <>
          <Text fontSize="1.2em" fontWeight="bold" textAlign="center" color={colors.blue}>Horarios inhábiles por fecha</Text>
          <Box marginTop="1em">
            <DisplayScheduleStatus
              schedules={times}
              onClick={handleScheduleClick}
            />
          </Box>
          <div className={styles.buttonWrapper}>
            <Button onClick={onClose}>Cerrar</Button>
            <Box marginRight="1em" />
            <Button variant="contained" onClick={handleUpdate}>Guardar</Button>
          </div>
        </>
      )}
    </Modal>
  );
};

DisableTimesPerDateEditor.propTypes = {
  open: bool.isRequired,
  stringDate: string.isRequired,
  branchId: string.isRequired,
  onClose: func.isRequired,
  setNotification: func.isRequired,
  onSuccess: func.isRequired,
};

export default withNotifications(DisableTimesPerDateEditor);
