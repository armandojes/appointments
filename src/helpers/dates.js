/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
function addZero(i) {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
}

export const formatToHourAndMinute = (date) => {
  try {
    const minute = date.getMinutes();
    const hour = date.getHours();
    return `${addZero(hour)}:${addZero(minute)}`;
  } catch (error) {
    return error.toString();
  }
};
