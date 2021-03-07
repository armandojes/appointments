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

export default {
  list,
  getSingle,
  UpdateGeneralInfo,
  updateDayStatus,
  updateSchedule,
};
