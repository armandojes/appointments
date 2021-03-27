/* eslint-disable no-constant-condition */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
const addZero = (date) => (date < 10 ? `0${date}` : date);

export const formatToHourAndMinute = (date) => {
  try {
    const minute = date.getMinutes();
    const hour = date.getHours();
    return `${addZero(hour)}:${addZero(minute)}`;
  } catch (error) {
    return error.toString();
  }
};

export const getDisplayDate = (date) => {
  try {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const esMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${day}/${esMonths[month]}/${year}`;
  } catch (error) {
    return error.toString();
  }
};

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

/**
 * make all schedules
 * @param {Date} start only ignore date only import time
 * @param {Date} end only ignore date only import time
 * @param {number} interval
 * @returns array of objects
 */
export const makeBlock = (start, end, interval) => {
  let blocks = [start];

  while (true) {
    const lastBlock = blocks[blocks.length - 1];
    const currentDate = addMinutes(lastBlock, interval);
    if (currentDate < end) blocks = [...blocks, currentDate];
    else break;
  }

  return blocks.map((block) => ({
    time: block,
    duration: interval,
    stringTime: formatToHourAndMinute(block),
  }));
};

export default {
  formatToHourAndMinute,
  getDisplayDate,
  addMinutes,
  makeBlock,
};
