/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Modal from 'src/components/modal';
import Text from 'src/components/main/text';
import useForm from 'src/hooks/useForm';
import Input from 'src/components/main/input';
import { Box, CircularProgress, Grid, IconButton } from '@material-ui/core';
import { bool, func, object } from 'prop-types';
import { colors } from 'src/constants';
import Button from 'src/components/main/button';
import branchesModel from 'src/core/models/branches';
import { Edit } from '@material-ui/icons';
import { TimePicker } from '@material-ui/pickers';
import withNotifications from 'src/highOrderComponents/withNotification';
import { toStringTime } from 'src/helpers/dates';
import styles from './styles.module.css';

const ScheduleEditor = (props) => {
  const { getInputProps, values, setValues } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [isStartClockActive, setStartClockActive] = useState(false);
  const [isEndClockActive, setEndClockActive] = useState(false);

  const handleStartChange = (newVaue) => {
    setValues((currentValues) => ({ ...currentValues, start: newVaue }));
  };

  const handleEndChange = (newVaue) => {
    setValues((currentValues) => ({ ...currentValues, end: newVaue }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { status } = await branchesModel.updateSchedule(props.data.branchId, props.data.day, values);
    if (status === 'success') {
      setLoading(false);
      props.onSuccess();
      props.onClose();
      props.setNotification({ message: 'Datos actualizados correctamente', type: 'success' });
    } else {
      setLoading(false);
      props.onClose();
      props.setNotification({ message: 'Error al actializar los datos', type: 'error' });
    }
  };

  // fill form data
  useEffect(() => { setValues(props.data); }, [props.data]);

  return (
    <Modal open={props.open}>
      {isLoading && (
        <Grid container alignItems="center" justify="center" style={{ minHeight: '200px' }}>
          <CircularProgress />
        </Grid>
      )}
      {!isLoading && (
        <>
          <Box marginBottom="1.5em">
            <Text fontWeight="bold" color={colors.green} fontSize="1.2em">{props.data.day}</Text>
          </Box>
          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Intervalo (en minutos)</Text>
            <Input {...getInputProps('interval')} />
          </Box>

          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Hora de inicio</Text>
            <div className={styles.dateInputWrapper}>
              <IconButton className={styles.clockIcon} onClick={() => setStartClockActive(true)}>
                <Edit />
              </IconButton>
              <Input value={toStringTime(values.start)} disabled />
              <Box display="none">
                <TimePicker
                  value={props.data.start}
                  open={isStartClockActive}
                  onClose={() => setStartClockActive(false)}
                  onChange={handleStartChange}
                />
              </Box>
            </div>
          </Box>

          <Box marginBottom="4em">
            <Text color={colors.blue} mb=".2em">Hora de finalizacion</Text>
            <div className={styles.dateInputWrapper}>
              <IconButton className={styles.clockIcon} onClick={() => setEndClockActive(true)}>
                <Edit />
              </IconButton>
              <Input value={toStringTime(values.end)} disabled />
              <Box display="none">
                <TimePicker
                  value={props.data.end}
                  open={isEndClockActive}
                  onClose={() => setEndClockActive(false)}
                  onChange={handleEndChange}
                />
              </Box>
            </div>
          </Box>
          <Grid container wrap="nowrap">
            <Button color={colors.blue} width="50%" onClick={props.onClose}>Cancelar</Button>
            <Box padding=".5em" />
            <Button color={colors.blue} width="50%" variant="contained" onClick={handleUpdate}>Guardar</Button>
          </Grid>
        </>
      )}
    </Modal>
  );
};

ScheduleEditor.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onSuccess: func.isRequired,
  data: object.isRequired,
  setNotification: func.isRequired,
};

export default withNotifications(ScheduleEditor);
