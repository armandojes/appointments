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
import { toStringDate } from 'src/helpers/dates';
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
    const disabled = await branchModel.getDisabledStringDates(branchId);
    setDisabledDates(disabled || []);
    setIsLoading(false);
  };

  const handleaddDisabledStringDate = async (newDate) => {
    const { status } = await branchModel.addDisabledStringDate(branchId, toStringDate(newDate));
    console.log(status);
    if (status === 'success') {
      setNotification({ type: 'success', message: 'Fecha deshábilitado correctamente!' });
      handlefetch();
    } else {
      setNotification({ type: 'error', message: 'Error al deshábilitar la fecha!' });
    }
  };

  const handleDeleteStringDate = async (stringDate) => {
    setDisabledDates(disabledDates.filter((stringDateTesting) => stringDateTesting !== stringDate)); // optimisic update
    const { status } = await branchModel.deleteDisabledStringDate(branchId, stringDate);
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
              onChange={handleaddDisabledStringDate}
              disablePast
              disableToolbar
              disabledDate
              shouldDisableDate={(testingDate) => disabledDates.map((d) => toStringDate(d)).includes(toStringDate(testingDate))}
            />
          </Box>
          <Card>
            <Text color={colors.blue} fontWeight="bold" fontSize="1.2em" marginBottom="1em">Fechas inhábiles</Text>
            <div className={styles.datesDisabledWrapper}>
              {disabledDates.map((disabledDate) => (
                <div className={styles.disabledDateWrapper} key={disabledDate.toString()}>
                  <div className={styles.disabledDateItem}>
                    <Text>{disabledDate}</Text>
                    <Close onClick={() => handleDeleteStringDate(disabledDate)} />
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
