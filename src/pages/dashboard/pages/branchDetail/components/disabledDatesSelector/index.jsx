/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import { array, func } from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

const DisabledDates = ({ schedules, onClick }) => (
  <div className={styles.wrapper}>
    <div className={styles.listContainer}>
      {schedules.map((schedule) => (
        <div className={`${styles.scheduleCard} ${schedule.isDisabled ? styles.scheduleCardDisabled : ''}`} onClick={() => onClick(schedule)}>
          {schedule.time}
        </div>
      ))}
    </div>
  </div>
);

DisabledDates.propTypes = {
  schedules: array.isRequired,
  onClick: func.isRequired,
};

export default DisabledDates;
