import firebase from 'firebase';
import database from './database';

/**
 * get branch list
 */
export const list = async () => {
  const fetcher = database.getList('branches', null, null, []);
  const branches = await fetcher.next();
  return branches.length ? branches : null;
};

export const getSingle = async (branchId) => {
  const branchdata = await database.getDocument(`branches/${branchId}`);
  return branchdata;
};

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
 * update day status at branch
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
      } },
    });
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
};

export const getDisabledDates = async (branchId) => {
  const fetcher = database.getList(`branches/${branchId}/disabled`, null, null, [['type', '==', 'DATE']]);
  const disabled = await fetcher.next();
  return disabled.length ? disabled.map((disabed) => disabed.date) : null;
};

export const addDisabledDate = async (branchId, date) => {
  const success = await database.create(`branches/${branchId}/disabled`, { type: 'DATE', date });
  if (success) return { status: 'success' };
  return { status: 'error' };
};

export const deleteDisabledDate = async (branchId, date) => {
  const success = await database.removeList(`branches/${branchId}/disabled`, [['type', '==', 'DATE'], ['date', '==', date]]);
  if (success) return { status: 'success' };
  return { status: 'error' };
};

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

export const deleteBranche = async (branchId) => {
  const status = await database.remove(`branches/${branchId}`);
  await database.updateList('/users', [['type', '==', 'employment']], {
    branches: firebase.firestore.FieldValue.arrayRemove(branchId),
  });
  if (status) return { status: 'success' };
  return { status: 'error' };
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
};
