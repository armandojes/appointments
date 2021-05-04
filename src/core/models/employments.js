/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import database from './database';
import branchesModel from './branches';
import { callable } from './firebase';
import sortItems from '../../helpers/sortItems';

export const deleteEmployment = async (employmentId) => {
  await new Promise((r) => setTimeout(r, 1000));
  const response = await callable.httpsCallable('deleteEmployment')({ employmentId });
  return response.data;
};

export const createNewEmployment = async (data) => {
  await new Promise((r) => setTimeout(r, 1000));
  const response = await callable.httpsCallable('createNewEmployment')(data);
  return response.data;
};

export const getEmploymentList = async () => {
  const fetcher = database.getList('users', false, ['name', 'desc'], [['type', '==', 'employment']]);
  const data = await fetcher.next();
  console.log('data', data);
  const dataParsed = await Promise.all(data.map(async (singleEmployment) => {
    if (singleEmployment.branchId) singleEmployment.branch = await branchesModel.getSingle(singleEmployment.branchId);
    return singleEmployment;
  }));
  return sortItems(dataParsed, 'name', 'ASC');
};

export const updateEmployment = async (userId, data) => {
  await new Promise((r) => setTimeout(r, 1000));
  const response = await callable.httpsCallable('updateEmployment')({ ...data, userId });
  return response.data;
};

export const getSingle = async (employmentId) => {
  const data = await database.getDocument(`/users/${employmentId}`);
  return data || {};
};

export const addBranch = async (employmentId, branchId) => {
  const status = await database.update(`/users/${employmentId}`, { branchId });
  if (status) return { status: 'success' };
  return { status: 'error' };
};

export const deleteBranch = async (employmentId) => {
  const status = await database.update(`/users/${employmentId}`, { branchId: null });
  if (status) return { status: 'success' };
  return { status: 'error' };
};

export default {
  createNewEmployment,
  getEmploymentList,
  deleteEmployment,
  updateEmployment,
  getSingle,
  addBranch,
  deleteBranch,
};
