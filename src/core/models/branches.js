/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import firebase from 'firebase';
import dates from 'src/helpers/dates';
import database from './database';

/**
 * get branch list
 */
export const list = async () => {
  const fetcher = database.getList('branches', null, null, []);
  const branches = await fetcher.next();
  return branches;
};

/**
 * get sngle branch data
 * @param {string} branchId
 */
export const getSingle = async (branchId) => {
  const branchdata = await database.getDocument(`branches/${branchId}`);
  return branchdata;
};

/**
 *  update general info
 * @param {string} branchId
 * @param {{}} data data to update
 */
export const UpdateGeneralInfo = async (branchId, data) => {
  try {
    const secureData = {
      name: data.name,
      address: data.address,
      phones: data.phones,
    };
    await database.update(`branches/${branchId}`, secureData);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
};

/**
 * update day status at branch
 * @param {string} branchId
 * @param {string} dayName
 * @param {Boolean} newValue
 */
export const updateDayStatus = async (branchId, dayName, newValue) => {
  try {
    await database.update(`branches/${branchId}`, {
      days: { [dayName]: { isEnabled: newValue } },
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
};

/**
 * update schedule at branch (start end, interval)
 * @param {string} branchId
 * @param {string} dayName
 * @param {{}} newValue start, end interval
 */
export const updateSchedule = async (branchId, dayName, newValue) => {
  try {
    await database.update(`branches/${branchId}`, {
      days: { [dayName]: {
        start: newValue.start,
        end: newValue.end,
        interval: newValue.interval,
        disableds: [],
      } },
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
};

/**
 * get disables dates at branch
 * @param {string} branchId
 */
export const getDisabledDates = async (branchId) => {
  const fetcher = database.getList(`branches/${branchId}/disabled`, null, null, [['type', '==', 'DATE']]);
  const disabled = await fetcher.next();
  return disabled.length ? disabled.map((disabed) => disabed.date) : null;
};

/**
 * add new disabled date
 * @param {string} branchId
 * @param {date} date
 */
export const addDisabledDate = async (branchId, date) => {
  const success = await database.create(`branches/${branchId}/disabled`, { type: 'DATE', date });
  if (success) return { status: 'success' };
  return { status: 'error' };
};

/**
 * delete disabled dates
 * @param {*} branchId
 * @param {*} date
 */
export const deleteDisabledDate = async (branchId, date) => {
  const success = await database.removeList(`branches/${branchId}/disabled`, [['type', '==', 'DATE'], ['date', '==', date]]);
  if (success) return { status: 'success' };
  return { status: 'error' };
};

/**
 * create new branch
 * @param {{}} data
 */
export const createNewBranch = async (data) => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  const success = await database.create('branches', {
    phones: data.phones,
    name: data.name,
    address: data.address,
    days: {
      friday: { start: date, end: date, isEnabled: false, interval: 5 },
      monday: { start: date, end: date, isEnabled: false, interval: 5 },
      saturday: { start: date, end: date, isEnabled: false, interval: 5 },
      sunday: { start: date, end: date, isEnabled: false, interval: 5 },
      thursday: { start: date, end: date, isEnabled: false, interval: 5 },
      tuesday: { start: date, end: date, isEnabled: false, interval: 5 },
      wednesday: { start: date, end: date, isEnabled: false, interval: 5 },
    },
  });
  if (success) return { status: 'success' };
  return { status: 'error' };
};

/**
 * delete branch
 * @param {strig} branchId
 */
export const deleteBranche = async (branchId) => {
  const status = await database.remove(`branches/${branchId}`);
  await database.updateList('/users', [['type', '==', 'employment']], {
    branches: firebase.firestore.FieldValue.arrayRemove(branchId),
  });
  if (status) return { status: 'success' };
  return { status: 'error' };
};

/**
 * get time status per day
 * @param {string} branchId
 * @param {string} dayName
 */
export const getTimeStatusPerDay = async (branchId, dayName) => {
  const { days = {} } = await getSingle(branchId);
  const daySelected = days[dayName] || {};
  const { start, end, interval = 1, disableds = [] } = daySelected;
  let blocks = dates.makeBlock(start, end, interval);
  const disabledsString = disableds.map((disabled) => dates.toStringTime(disabled));
  blocks = blocks.map((block) => {
    const currentBlockString = dates.toStringTime(block.time);
    const blockWithStatus = {
      ...block,
      isDisabled: disabledsString.includes(currentBlockString),
    };
    return blockWithStatus;
  });
  return blocks;
};

/**
 * update schedule day with status
 * @param {string} branchId
 * @param {string} dayName
 * @param {Array} schedules all schedules with status
 */
export const updateTimesStatusPerDay = async (branchId, dayName, schedules) => {
  const scheduleDisableds = schedules.filter((schedule) => schedule.isDisabled);
  const timesDisabled = scheduleDisableds.map((schedule) => schedule.time);
  await database.update(`branches/${branchId}`, {
    days: {
      [dayName]: {
        disableds: timesDisabled,
      },
    },
  });
  return { status: 'success' };
};

export const getTimesStatusPerDate = async (branchId, date) => {
  const { disabledTimes = {}, ...branchData } = await getSingle(branchId);
  const dayName = dates.getDayName(date);
  const { start, end, interval } = branchData.days[dayName];
  let blockTimes = dates.makeBlock(start, end, interval);
  const diesabledTimes = disabledTimes[dates.toStringDate(date)] || [];
  const disabledTimesString = diesabledTimes.map((disabled) => dates.toStringTime(disabled));
  blockTimes = blockTimes.map((block) => {
    const currentBlockString = dates.toStringTime(block.time);
    const blockWithStatus = {
      ...block,
      isDisabled: disabledTimesString.includes(currentBlockString),
    };
    return blockWithStatus;
  });
  return blockTimes;
};

/**
 * update disabled times per date
 * @param {string} branchId
 * @param {Date} date
 * @param {Array} times all times with status
 */
export const updateTimesStatusPerDate = async (branchId, date, times) => {
  const timesDisabledsBlock = times.filter((schedule) => schedule.isDisabled);
  const timesDisableds = timesDisabledsBlock.map((schedule) => schedule.time);
  if (!timesDisableds.length) {
    const status = await database.update(`/branches/${branchId}`, {
      disabledTimes: {
        [dates.toStringDate(date)]: firebase.firestore.FieldValue.delete(),
      },
    });
    return status ? { status: 'success' } : { status: 'error', errorMessage: 'Error, algo salió mal' };
  }
  const status = await database.update(`/branches/${branchId}`, {
    disabledTimes: {
      [dates.toStringDate(date)]: timesDisableds,
    },
  });
  return status ? { status: 'success' } : { status: 'error', errorMessage: 'Error, algo salió mal' };
};

export default {
  list,
  getSingle,
  UpdateGeneralInfo,
  updateDayStatus,
  updateSchedule,
  getDisabledDates,
  addDisabledDate,
  deleteDisabledDate,
  createNewBranch,
  deleteBranche,
  getTimeStatusPerDay,
  updateTimesStatusPerDay,
  getTimesStatusPerDate,
  updateTimesStatusPerDate,
};
