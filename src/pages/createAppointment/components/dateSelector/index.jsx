/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import caldendarIconSrc from 'src/assets/icono_calendario.png';
import { DatePicker } from '@material-ui/pickers';
import { Box, Menu } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { array, func, instanceOf, string } from 'prop-types';
import ErrorMessage from 'src/components/errorMessage';
import styles from './styles.module.css';
import Header from '../header';

const DateSelector = ({ onTimeSelect, stringTime, onDateSelect, date, times, errorMessage, shouldDisableDate }) => {
  const [anchorSelect, setAnchorSelect] = useState(null);

  const handleOpenMenu = (event) => {
    if (times.length) setAnchorSelect(event.currentTarget);
  };
  const handleClose = () => setAnchorSelect(null);

  return (
    <div>
      <Menu
        open={!!anchorSelect}
        anchorEl={anchorSelect}
        anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
        onClose={handleClose}
        BackdropProps={{ className: styles.backdropSelectOpen }}
        onClick={handleClose}
      >
        {times.map((currentTime, index) => (
          <div role="button" key={index} onClick={() => onTimeSelect(currentTime)} className={styles.option}>{currentTime} Hrs.</div>
        ))}
      </Menu>
      <Header title="Registra tu cita" icon={caldendarIconSrc} step={3} />
      <div className={styles.body}>
        <ErrorMessage message={errorMessage} marginBottom="1em" />
        <div className={styles.subtitle}>Sucursal: Unidad Arcos</div>
        <div className={styles.title}>Elige el día y la hora de tu cita</div>
        <div className={styles.wrapperFlex}>

          <div className={styles.sectionWrapper}>
            <div className={styles.titleSection}>Día</div>
            <div className={styles.calendarWrapper}>
              <DatePicker
                shouldDisableDate={shouldDisableDate}
                variant="static"
                disableToolbar
                className={styles.caldendar}
                disablePast
                onChange={onDateSelect}
                value={date}
              />
            </div>

          </div>
          <div className={styles.sectionWrapper}>
            <div className={styles.titleSection}>Día</div>
            <div role="button" className={styles.selectShaddow} onClick={handleOpenMenu}>
              {stringTime}
              <ArrowDropDown className={styles.arrow} />
            </div>
            <Box color="#fff">16:10 Hrs.</Box>
          </div>

        </div>
      </div>
    </div>
  );
};

DateSelector.propTypes = {
  onTimeSelect: func.isRequired,
  stringTime: string.isRequired,
  shouldDisableDate: func.isRequired,
  onDateSelect: func.isRequired,
  date: instanceOf(Date).isRequired,
  times: array.isRequired,
  errorMessage: string.isRequired,
};

export default DateSelector;
