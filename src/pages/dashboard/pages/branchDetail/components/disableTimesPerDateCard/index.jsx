/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
import { Box } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { DatePicker } from '@material-ui/pickers';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import branches from '../../../../../../core/models/branches';
import dates from '../../../../../../helpers/dates';
import useFetch from '../../../../../../hooks/useFetch';
import DisableTimesPerDateEditor from '../disableTimesPeerDateEditor';
import styles from './styles.module.css';

const disableTimesPerDateCard = () => {
  const { branchId } = useParams();
  const [dateSelected, setDateSelected] = useState(null);
  const [datesList, setDatesList] = useState([]);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handleCalendarOpen = () => setCalendarOpen(true);
  const handleCaldendarCose = () => setCalendarOpen(false);
  const handleDateSelectedChange = (date) => setDateSelected(dates.getDisplayDate(date));
  const handleTimeSelectorClose = () => setDateSelected(null);

  const handleFetch = async () => {
    const { disabledTimes = {} } = await branches.getSingle(branchId);
    setDatesList(disabledTimes);
  };

  useFetch(handleFetch);

  return (
    <Card>
      <DisableTimesPerDateEditor
        onClose={handleTimeSelectorClose}
        open={!!dateSelected}
        date={dateSelected || new Date()}
        branchId={branchId}
      />
      <Box display="none">
        <DatePicker
          open={isCalendarOpen}
          disablePast
          disableToolbar
          onClose={handleCaldendarCose}
          onChange={handleDateSelectedChange}
        />
      </Box>
      <Text fontSize="1.2em" color={colors.blue} fontWeight="bold" marginBottom="1em">Horarios inhábiles por fecha </Text>
      <div className={styles.datesDisabledWrapper}>
        {Object.keys(datesList).map((date) => (
          <div className={styles.disabledDateWrapper} key={date}>
            <div className={styles.disabledDateItem}>
              <Text>{date}</Text>
              <Close />
            </div>
          </div>
        ))}
        <div className={styles.disabledDateWrapper}>
          <div className={`${styles.disabledDateItem} ${styles.addDateItem}`} onClick={handleCalendarOpen}>
            <Text>Agregar</Text>
            <Add />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default disableTimesPerDateCard;
