/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import database from './database';
import { callable } from './firebase';

export const createRequestForNewCompany = async (data) => {
  const isEmailUsed = await database.getList('users', false, false, [['email', '==', data.userEmail.toString().toLowerCase()]]).next();
  if (isEmailUsed && isEmailUsed.length) return { status: 'error', errorMessage: 'El correo ya se encuentra registrado' };

  const isEmailUsedAtRequest = await database.getList('requestNewCompanies', false, false, [['userEmail', '==', data.userEmail.toString().toLowerCase()]]).next();
  if (isEmailUsedAtRequest && isEmailUsedAtRequest.length) return { status: 'error', errorMessage: 'El correo ya se encuentra registrado' };

  const compnySchema = {
    companyName: data.companyName,
    userFullName: data.userFullName,
    userEmail: data.userEmail.toString().toLowerCase(),
    companyPhone: data.companyPhone,
    companyRazonSocial: data.companyRazonSocial,
    companyAddress: data.companyAddress,
    companyRFC: data.companyRFC,
    companyEmail: data.companyEmail.toString().toLowerCase(),
  };
  const status = await database.create('/requestNewCompanies', compnySchema);
  return { status: status ? 'success' : 'error', errorMessage: !status ? 'error interno del servidor' : null };
};

export const getRequests = async () => {
  const data = await database.getList('requestNewCompanies', false, ['createdAt', 'desc']).next();
  return data;
};

export const deleteRequestCompany = async (compnyId) => {
  const result = await database.remove(`requestNewCompanies/${compnyId}`);
  if (result) return { status: 'success' };
  return { status: 'error' };
};

// validating on server
export const createNewCompany = async (data) => {
  const response = await callable.httpsCallable('createNewCompany')(data);
  return response.data;
};

export const getApproveds = async () => {
  const list = await database.getList('users', false, false, [['type', '==', 'companyManager']]).next();
  return list;
};

export const deleteAproved = async (companyId) => {
  const response = await callable.httpsCallable('deleteCompany')({ companyId });
  return response.data;
};

export default {
  createRequestForNewCompany,
  deleteRequestCompany,
  deleteAproved,
  createNewCompany,
};
