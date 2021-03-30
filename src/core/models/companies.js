/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import firebase from 'firebase';
import database from './database';
import { callable } from './firebase';
import studiesModel from './studies';

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

export const updateCompany = async (companyId, newData) => {
  const response = await callable.httpsCallable('updateCompany')({ ...newData, id: companyId });
  return response.data;
};

export const getCompany = async (companyId) => {
  const data = await database.getDocument(`users/${companyId}`);
  if (data && data.company) return data.company;
  return null;
};

/**
 * get all studies with company association status
 * @param {*} companyId
 */
export const getStudiesWithStatus = async (companyId) => {
  const { studies = [] } = await getCompany(companyId);
  const allStudies = await studiesModel.getStudies();
  return allStudies.map((study) => {
    const studyParsed = {
      ...study,
      isAvailable: studies.includes(study.id),
    };
    return studyParsed;
  });
};

export const addNewStudy = async (companyId, studyId) => {
  const status = await database.update(`users/${companyId}`, {
    company: {
      studies: firebase.firestore.FieldValue.arrayUnion(studyId),
    },
  });
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, Algo salio mal' };
};

export const deleteStudy = async (companyId, studyId) => {
  const status = await database.update(`users/${companyId}`, {
    company: {
      studies: firebase.firestore.FieldValue.arrayRemove(studyId),
    },
  });
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, Algo salio mal' };
};

export default {
  createRequestForNewCompany,
  deleteRequestCompany,
  deleteAproved,
  createNewCompany,
  updateCompany,
  getCompany,
  getStudiesWithStatus,
  addNewStudy,
  deleteStudy,
};
