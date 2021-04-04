/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/order */
import React, { useState } from 'react';
import Header from '../header';
import caldendarIconSrc from 'src/assets/icono_calendario.png';
import styles from './styles.module.css';
import { DatePicker } from '@material-ui/pickers';
import { Box, Menu } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { array, func, instanceOf, string } from 'prop-types';
import dates from '../../../../helpers/dates';

const times = [
  '11:15',
  '11:15',
  '11:15',
  '11:15',
  '11:15',
  '11:15',
  '11:15',
  '11:15',
  '11:15',
];

const DateSelector = ({ onTimeSelect, stringTime, disabledDates, onDateSelect, date }) => {
  const [anchorSelect, setAnchorSelect] = useState(null);

  const handleOpenMenu = (event) => setAnchorSelect(event.currentTarget);
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
          <div key={index} onClick={() => onTimeSelect(currentTime)} className={styles.option}>{currentTime} Hrs.</div>
        ))}
      </Menu>
      <Header title="Registra tu cita" icon={caldendarIconSrc} step={3} />
      <div className={styles.body}>
        <div className={styles.subtitle}>Sucursal: Unidad Arcos</div>
        <div className={styles.title}>Elige el día y la hora de tu cita</div>
        <div className={styles.wrapperFlex}>

          <div className={styles.sectionWrapper}>
            <div className={styles.titleSection}>Día</div>
            <div className={styles.calendarWrapper}>
              <DatePicker
                shouldDisableDate={(currentDate) => disabledDates.includes(dates.toStringDate(currentDate))}
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
            <div className={styles.selectShaddow} onClick={handleOpenMenu}>
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
  disabledDates: array.isRequired,
  onDateSelect: func.isRequired,
  date: instanceOf(Date).isRequired,
};

export default DateSelector;
