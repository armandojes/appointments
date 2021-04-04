/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-constant-condition */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
const addZero = (date) => (date < 10 ? `0${date}` : date);

export const toStringTime = (date) => {
  try {
    const minute = date.getMinutes();
    const hour = date.getHours();
    return `${addZero(hour)}:${addZero(minute)}`;
  } catch (error) {
    return error.toString();
  }
};

export const toStringDate = (date) => {
  try {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    return error.toString();
  }
};

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

/**
 * get date name by date
 * @param {Date} date
 * @returns {string} dayName
 */
export const getDayName = (date) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
};

export const stringDateToDate = (stringDate) => {
  if (!stringDate) return new Date();
  try {
    let [dayNumber, month, year] = stringDate.split('/');
    dayNumber = Number.parseInt(dayNumber, 10);
    month = Number.parseInt(month, 10) - 1;
    year = Number.parseInt(year, 10);
    const date = new Date();
    console.log('dayNumber, month, year', dayNumber, month, year);
    date.setDate(dayNumber);
    date.setMonth(month);
    date.setFullYear(year);
    return date;
  } catch (error) {
    return new Date();
  }
};

export const strngTimeToDate = (stringTime) => {
  try {
    let [hours, minutes] = stringTime.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    const date = new Date();
    date.setMinutes(minutes);
    date.setHours(hours);
    return date;
  } catch (e) {
    return new Date();
  }
};

/**
 * make all schedules
 * @param {string} stringStart
 * @param {string} stringEnd
 * @param {number} interval
 * @returns array of objects
 */
export const makeBlock = (stringStart, stringEnd, interval) => {
  const start = strngTimeToDate(stringStart);
  const end = strngTimeToDate(stringEnd);
  let blocks = [start];

  while (true) {
    const lastBlock = blocks[blocks.length - 1];
    const currentDate = addMinutes(lastBlock, interval);
    if (currentDate < end) blocks = [...blocks, currentDate];
    else break;
  }

  return blocks.map((block) => ({
    duration: interval,
    stringTime: toStringTime(block),
  }));
};

export default {
  toStringTime,
  toStringDate,
  addMinutes,
  makeBlock,
  getDayName,
  stringDateToDate,
  strngTimeToDate,
};
