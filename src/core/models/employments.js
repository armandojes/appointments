/* eslint-disable no-unused-vars */
import firebase from 'firebase';
import database from './database';

export const deleteEmployment = async (employmentId) => {
  await new Promise((r) => setTimeout(r, 1000));
  const response = await firebase.functions().httpsCallable('deleteEmployment')({ employmentId });
  return response.data;
};

export const createNewEmployment = async (data) => {
  await new Promise((r) => setTimeout(r, 1000));
  const response = await firebase.functions().httpsCallable('createNewEmployment')(data);
  return response.data;
};

export const getEmploymentList = async () => {
  const fetcher = database.getList('users', false, ['name', 'desc'], [['type', '==', 'employment']]);
  const data = await fetcher.next();
  return data;
};

export const updateEmployment = async (userId, data) => {
  await new Promise((r) => setTimeout(r, 1000));
  const response = await firebase.functions().httpsCallable('updateEmployment')({ ...data, userId });
  return response.data;
};

export default {
  createNewEmployment,
  getEmploymentList,
  deleteEmployment,
  updateEmployment,
};
