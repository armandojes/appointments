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
