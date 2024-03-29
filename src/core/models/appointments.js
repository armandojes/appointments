import dates, { composeDatebyStrings, fillTime, getDayName, stringDateToDate, toStringDate } from '../../helpers/dates';
import { getIntervalByDate } from './branches';
import database from './database';
import { getAppointmentCounters } from './counters';
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

  // filter by dayName disabled
  if (!branchData.days[dayName].isEnabled) times = [];

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

  // filter by past time in the same day
  if (stringDate === toStringDate(new Date())) {
    times = times.filter((time) => {
      const timeParsed = composeDatebyStrings(toStringDate(new Date()), time.stringTime);
      return timeParsed.getTime() >= new Date().getTime();
    });
  }

  return times.map((time) => time.stringTime);
};

/**
 * save appointment important studies WithStatus
 * @param {object} values
 */
export const saveAppointment = async (values) => {
  const appointmentId = await getAppointmentCounters();
  const availableTimes = await getAvailableTimes(values.branch, values.stringDate);
  if (!availableTimes.includes(values.stringTime)) return { status: 'error', errorMessage: 'La hora seleccionada ya no esta disponible, porfavor elija otro horario' };

  const { studies = [] } = values;
  const studiesParsed = studies.map(({ id, title, indications = '' }) => ({ id, title, indications }));
  const interval = await getIntervalByDate(values.branch, values.stringDate);
  const secureData = {
    status: 'pending',
    branch: values.branch,
    patientBirthDate: values.patientBirthDate || null,
    patientName: `${values.patientName} ${values.patientPlastName} ${values.patientMlastName || ''}`,
    payoutType: values.payoutType,
    stringDate: values.stringDate,
    stringTime: values.stringTime,
    otherStudy: values.otherStudy || null,
    payoutComments: values.payoutComments || null,
    studies: studiesParsed,
    profiles: values.profiles,
    appointmentDate: composeDatebyStrings(values.stringDate, values.stringTime),
    interval,
    company: values.company,
  };

  const operationResult = await database.create('appointments', secureData, appointmentId);
  if (operationResult) return { status: 'success', id: operationResult.id };
  return { status: 'error', errorMessage: 'Error algo salió mal' };
};

/**
 * get all apointments
 * @param {*} currentBranch optional filter
 */
export const getAllAppointments = async (currentBranch) => {
  const startOfDate = new Date(); startOfDate.setHours(0); startOfDate.setMinutes(0); startOfDate.setSeconds(0);
  const filters = [['appointmentDate', '>=', startOfDate]];
  if (currentBranch) filters.push(['branch', '==', currentBranch]);
  const list = await database.getList('appointments', null, null, filters).next();
  return list;
};

export const getSingleAppointment = async (appointmentId) => {
  const appointmentData = await database.getDocument(`appointments/${appointmentId}`);
  return appointmentData;
};

export const updateAppointmentStatus = async (appointmentId, newStatus) => {
  await database.update(`appointments/${appointmentId}`, { status: newStatus });
  return true;
};
export const getCompanyAppointmentsHistory = async (companyId) => {
  const data = await database.getList('appointments', null, ['createdAt', 'desc'], [['company.id', '==', companyId]]).next();
  return data;
};

export const deleteAppointment = async (appointmentId) => {
  const status = await database.remove(`/appointments/${appointmentId}`);
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, algo salió mal' };
};

getCompanyAppointmentsHistory('IzyBtN7UiLcgNVgfxRwspNyh20s1');
