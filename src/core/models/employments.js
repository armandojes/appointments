/* eslint-disable no-unused-vars */
import firebase from 'firebase';
import database from './database';

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

export default {
  createNewEmployment,
  getEmploymentList,
};
