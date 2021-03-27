/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import database from './database';

/**
 * get all getAvailable appointments as array
 * @param {*} branchId
 */
export const getAvailableAppointments = async (branchId, date) => {
  const branchData = await database.getDocument(`appointmentBranches/${branchId}`);
  console.log(branchData);
};
