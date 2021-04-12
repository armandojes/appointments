/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import Modal from 'src/components/modal';
import Text from 'src/components/main/text';
import useForm from 'src/hooks/useForm';
import Input from 'src/components/main/input';
import { Box, CircularProgress, Grid, IconButton } from '@material-ui/core';
import { bool, func, object } from 'prop-types';
import { colors, days } from 'src/constants';
import Button from 'src/components/main/button';
import branchesModel from 'src/core/models/branches';
import { Edit } from '@material-ui/icons';
import { TimePicker } from '@material-ui/pickers';
import dates from 'src/helpers/dates';
import styles from './styles.module.css';
import useNotification from '../../../../../../notifications/useSession';
import useErrorMessage from '../../../../../../hooks/useErrorMessage';
import ErrorMessage from '../../../../../../components/errorMessage';

const ScheduleEditor = (props) => {
  const { setErrorMessage, errorMessage } = useErrorMessage();
  const setNotification = useNotification();
  const { getInputProps, values, setValues, handleValidateForm } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [isStartClockActive, setStartClockActive] = useState(false);
  const [isEndClockActive, setEndClockActive] = useState(false);

  const handleStartChange = (newVaue) => {
    setValues((currentValues) => ({ ...currentValues, start: dates.toStringTime(newVaue) }));
  };

  const handleEndChange = (newVaue) => {
    setValues((currentValues) => ({ ...currentValues, end: dates.toStringTime(newVaue) }));
  };

  const handleUpdate = async () => {
    const erros = handleValidateForm({ interval: (val) => ((!val || parseInt(val, 10) > 60) ? 'El intervalo debe ser un valor entre 1 y 60' : false) });
    if (Object.values(erros).length) return setErrorMessage(Object.values(erros)[0]);

    setLoading(true);
    const { status } = await branchesModel.updateSchedule(props.data.branchId, props.data.day, values);
    if (status === 'success') {
      setLoading(false);
      props.onSuccess();
      props.onClose();
      setNotification({ message: 'Datos actualizados correctamente', type: 'success' });
    } else {
      setLoading(false);
      props.onClose();
      setNotification({ message: 'Error al actializar los datos', type: 'error' });
    }
    return null;
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
            <Text fontWeight="bold" color={colors.green} fontSize="1.2em">{days[props.data.day]}</Text>
          </Box>
          <ErrorMessage message={errorMessage} />
          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Intervalo (en minutos)</Text>
            <Input {...getInputProps('interval')} onlyNumbers maxLength={2} />
          </Box>

          <Box marginBottom=".5em">
            <Text color={colors.blue} mb=".2em">Hora de inicio</Text>
            <div className={styles.dateInputWrapper}>
              <IconButton className={styles.clockIcon} onClick={() => setStartClockActive(true)}>
                <Edit />
              </IconButton>
              <Input {...getInputProps('start')} value={values.start} disabled />
              <Box display="none">
                <TimePicker
                  value={dates.strngTimeToDate(values.start || '')}
                  open={isStartClockActive}
                  onClose={() => setStartClockActive(false)}
                  onChange={handleStartChange}
                />
              </Box>
            </div>
          </Box>

          <Box marginBottom="4em">
            <Text color={colors.blue} mb=".2em">Hora de finalización</Text>
            <div className={styles.dateInputWrapper}>
              <IconButton className={styles.clockIcon} onClick={() => setEndClockActive(true)}>
                <Edit />
              </IconButton>
              <Input {...getInputProps('end')} value={values.end} disabled />
              <Box display="none">
                <TimePicker
                  value={dates.strngTimeToDate(values.end)}
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
};

export default ScheduleEditor;
