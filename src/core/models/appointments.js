/* eslint-disable no-unused-vars */
import dates, { composeDatebyStrings, fillTime, getDayName, stringDateToDate } from '../../helpers/dates';
import { getIntervalByDate } from './branches';
import database from './database';

/**
 * get appointmnts list at specific date
 * @param {string} branchId
 * @param {string} stringDate
 */
export const getAppointmentsByDate = async (branchId, stringDate) => {
  const appointments = await database.getList('appointments', null, ['appointmentDate', 'asc'], [['stringDate', '==', stringDate], ['branch', '==', branchId]]).next();
  return appointments;
};

/**
 * get all getAvailable appointments as array
 * @param {String} branchId
 * @param {String} stringDate
 */
export const getAvailableTimes = async (branchId, stringDate) => {
  const branchData = await database.getDocument(`branches/${branchId}`);
  const dayName = getDayName(stringDateToDate(stringDate));
  const daySelected = branchData.days[dayName];
  let times = dates.makeBlock(daySelected.start, daySelected.end, daySelected.interval);

  // filter by disabled all date
  if (branchData.disabledStringDates && branchData.disabledStringDates.includes(stringDate)) times = [];

  // filter times by disabled times per day
  const disabledTimesAtDay = daySelected.disabledTimes || [];
  times = times.filter((currentTime) => !disabledTimesAtDay.includes(currentTime.stringTime));

  // filter by disables times per date;
  const disabledTimesPerDate = branchData.disabledTimes || {};
  const disabledTimesAtDate = disabledTimesPerDate[stringDate] || [];
  times = times.filter((currentTime) => !disabledTimesAtDate.includes(currentTime.stringTime));

  // filter by prev appointments
  const prevAppointment = await getAppointmentsByDate(branchId, stringDate);
  let munutesUsed = [];
  prevAppointment.forEach((currentAppointment) => {
    const minutes = fillTime(currentAppointment.stringTime, currentAppointment.interval);
    munutesUsed = [...munutesUsed, ...minutes];
  });
  times = times.filter((time) => {
    const currentTimeMinutes = fillTime(time.stringTime, daySelected.interval);
    const isAllMinutesFree = !currentTimeMinutes.some((minute) => munutesUsed.includes(minute));
    return isAllMinutesFree;
  });

  return times.map((t) => t.stringTime);
};

/**
 * save appointment important studies WithStatus
 * @param {object} values
 */
export const saveAppointment = async (values) => {
  const availableTimes = await getAvailableTimes(values.branch, values.stringDate);
  if (!availableTimes.includes(values.stringTime)) return { status: 'error', errorMessage: 'La hora seleccionada ya no esta disponible, porfavor elija otro horario' };

  const { studies = [] } = values;
  const studiesParsed = studies.map(({ id, price, title, indications }) => ({ id, price, title, indications }));
  const interval = await getIntervalByDate(values.branch, values.stringDate);
  const secureData = {
    branch: values.branch,
    patientBirthDate: values.patientBirthDate,
    patientName: values.patientName,
    payoutType: values.payoutType,
    stringDate: values.stringDate,
    stringTime: values.stringTime,
    otherStudy: values.otherStudy || null,
    payoutComments: values.payoutComments || null,
    studies: studiesParsed,
    total: studiesParsed.reduce((acum, { price }) => acum + price, 0),
    appointmentDate: composeDatebyStrings(values.stringDate, values.stringTime),
    interval,
  };

  const operationResult = await database.create('appointments', secureData);
  if (operationResult) return { status: 'success', id: operationResult.id };
  return { status: 'error', errorMessage: 'Error algo salió mal' };
};
