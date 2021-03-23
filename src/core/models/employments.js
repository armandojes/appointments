/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import firebase from 'firebase';
import database from './database';
import branchesmodel from './branches';
import { callable } from './firebase';

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
  let data = await fetcher.next();
  data = await Promise.all(data.map(async (currentData) => {
    if (currentData.branches && currentData.branches.length) {
      currentData.branches = await Promise.all(currentData.branches.map((branchId) => branchesmodel.getSingle(branchId)));
    }
    return currentData;
  }));
  return data;
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
  const status = await database.update(`/users/${employmentId}`, {
    branches: firebase.firestore.FieldValue.arrayUnion(branchId),
  });
  if (status) return { status: 'success' };
  return { status: 'error' };
};

export const deleteBranch = async (employmentId, branchId) => {
  const status = await database.update(`/users/${employmentId}`, {
    branches: firebase.firestore.FieldValue.arrayRemove(branchId),
  });
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
