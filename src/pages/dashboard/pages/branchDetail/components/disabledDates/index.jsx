/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import branchModel from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import Card from 'src/components/card';
import { func } from 'prop-types';
import withNotifications from 'src/highOrderComponents/withNotification';
import { Add, Close } from '@material-ui/icons';
import { getDisplayDate } from 'src/helpers/dates';
import { DatePicker } from '@material-ui/pickers';
import { Box } from '@material-ui/core';
import styles from './styles.module.css';

const DisablesDates = ({ setNotification }) => {
  const [disabledDates, setDisabledDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDateSelecterOpen, setIsDateSelecterOpen] = useState(false);
  const { branchId } = useParams();

  const handleModalOpen = () => setIsDateSelecterOpen(true);
  const handleModalClose = () => setIsDateSelecterOpen(false);

  // data fetcher from API
  const handlefetch = async () => {
    const disabled = await branchModel.getDisabledDates(branchId);
    setDisabledDates(disabled || []);
    setIsLoading(false);
  };

  const handleAddDisabledDate = async (newDate) => {
    const { status } = await branchModel.addDisabledDate(branchId, newDate);
    console.log(status);
    if (status === 'success') {
      setNotification({ type: 'success', message: 'Fecha deshábilitado correctamente!' });
      handlefetch();
    } else {
      setNotification({ type: 'error', message: 'Error al deshábilitar la fecha!' });
    }
  };

  const handleDeleteDate = async (date) => {
    setDisabledDates((dates) => dates.filter((d) => d !== date));
    const { status } = await branchModel.deleteDisabledDate(branchId, date);
    if (status === 'success') {
      setNotification({ type: 'success', message: 'Fecha eliminado correctamente' });
      handlefetch();
    } else {
      setNotification({ type: 'error', message: 'Error al eliminar la fecha!' });
    }
  };

  // fecth initial Data
  useFetch(handlefetch, []);

  return (
    <>
      {!isLoading && (
        <>
          <Box display="none">
            <DatePicker
              open={isDateSelecterOpen}
              onClose={handleModalClose}
              onChange={handleAddDisabledDate}
              disablePast
              disableToolbar
              disabledDate
              shouldDisableDate={(testingDate) => disabledDates.map((d) => getDisplayDate(d)).includes(getDisplayDate(testingDate))}
            />
          </Box>
          <Card>
            <Text color={colors.blue} fontWeight="bold" fontSize="1.2em" marginBottom="1em">Fechas inhábiles</Text>
            <div className={styles.datesDisabledWrapper}>
              {disabledDates.map((disabledDate) => (
                <div className={styles.disabledDateWrapper} key={disabledDate.toString()}>
                  <div className={styles.disabledDateItem}>
                    <Text>{getDisplayDate(disabledDate)}</Text>
                    <Close onClick={() => handleDeleteDate(disabledDate)} />
                  </div>
                </div>
              ))}
              <div className={styles.disabledDateWrapper}>
                <div className={`${styles.disabledDateItem} ${styles.addDateItem}`} onClick={handleModalOpen}>
                  <Text>Agregar</Text>
                  <Add />
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

DisablesDates.propTypes = {
  setNotification: func.isRequired,
};

export default withNotifications(DisablesDates);
