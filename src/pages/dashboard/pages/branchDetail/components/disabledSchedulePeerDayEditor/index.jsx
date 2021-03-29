/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { bool, func, string } from 'prop-types';
import React, { useState } from 'react';
import Modal from 'src/components/modal';
import Button from 'src/components/main/button';
import Text from 'src/components/main/text';
import { colors, days } from 'src/constants';
import branchesModel from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import withNotifications from 'src/highOrderComponents/withNotification';
import { toStringTime } from 'src/helpers/dates';
import DisplayScheduleStatus from '../disabledDatesSelector';
import styles from './styles.module.css';

const DisabledSchedulePerDayEditor = ({ open, data, onClose, setNotification }) => {
  const [scheduleList, setScheduleList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleFetch = async () => {
    if (open) {
      setLoading(true);
      const values = await branchesModel.getTimeStatusPerDay(data.branchId, data.day);
      setScheduleList(values);
      setLoading(false);
    }
  };

  useFetch(handleFetch, [data.branchId, data.day, open]);

  const handleScheduleClick = ({ time }) => {
    const newScheduleList = scheduleList.map((currentSchedule) => {
      if (toStringTime(currentSchedule.time) === toStringTime(time)) currentSchedule.isDisabled = !currentSchedule.isDisabled;
      return currentSchedule;
    });
    setScheduleList(newScheduleList);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { status } = await branchesModel.updateTimesStatusPerDay(data.branchId, data.day, scheduleList);
    if (status === 'success') setNotification({ type: 'success', message: 'Horarios actualizado correctamente' });
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} className={styles.modalCard}>
      {isLoading && (
        <Grid container justify="center" style={{ minHeight: '250px' }} alignItems="center">
          <CircularProgress />
        </Grid>
      )}
      {!isLoading && (
        <>
          <Text fontSize="1.2em" fontWeight="bold" textAlign="center" color={colors.blue}>Horarios {days[data.day]}</Text>
          <Box marginTop="1em">
            <DisplayScheduleStatus
              schedules={scheduleList}
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

DisabledSchedulePerDayEditor.propTypes = {
  data: string.isRequired,
  open: bool.isRequired,
  onClose: func.isRequired,
  setNotification: func.isRequired,
};

export default withNotifications(DisabledSchedulePerDayEditor);
