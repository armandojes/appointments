/* eslint-disable import/prefer-default-export */
import database from './database';

export const getAvailableAppointments = async (branchId) => {
  const branchData = await database.getDocument(`appointmentBranches/${branchId}`);
  console.log(branchData);
};

getAvailableAppointments('xkzq4X5WRKu0RyyqB4zT');
