/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/order */
import React, { useState } from 'react';
import Header from '../header';
import caldendarIconSrc from 'src/assets/icono_calendario.png';
import styles from './styles.module.css';
import { DatePicker } from '@material-ui/pickers';
import { Box, Menu } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { func, string } from 'prop-types';

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

const DateSelector = ({ onTimeSelect, time }) => {
  const [anchorSelect, setAnchorSelect] = useState(null);

  const handleOpenMenu = (event) => setAnchorSelect(event.currentTarget);
  const handleClose = () => setAnchorSelect(null);

  return (
    <div>
      <Menu
        open={!!anchorSelect}
        anchorEl={anchorSelect}
        anchorOrigin={{ horizontal: 'left' }}
        onClose={handleClose}
        BackdropProps={{ className: styles.backdropSelectOpen }}
        onClick={handleClose}
      >
        {times.map((currentTime) => (
          <div onClick={() => onTimeSelect(currentTime)} className={styles.option}>{currentTime} Hrs.</div>
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
                variant="static"
                disableToolbar
                className={styles.caldendar}
                disablePast
              />
            </div>

          </div>
          <div className={styles.sectionWrapper}>
            <div className={styles.titleSection}>Día</div>
            <div className={styles.selectShaddow} onClick={handleOpenMenu}>
              {time}
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
  time: string.isRequired,
};

export default DateSelector;
