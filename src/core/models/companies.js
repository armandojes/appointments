import firebase from 'firebase';
import { loginWithEmailAndPAssword } from './auth';
import { getCompanyCounter } from './counters';
import database from './database';
import { callable } from './firebase';
import studiesModel from './studies';
import profilesModel from './profiles';

export const createRequestForNewCompany = async (data) => {
  const loginRes = await loginWithEmailAndPAssword({ email: data.userEmail, password: 'xxxxxxxxxx' });
  if (loginRes.firebaseMessage === 'auth/wrong-password') return { status: 'error', errorMessage: 'El correo ya se encuentra registrado' };

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
  const companyCustomId = await getCompanyCounter(data.companyName);
  const response = await callable.httpsCallable('createNewCompany')({ ...data, companyCustomId });
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

export const updateMethosPay = async (companyId, methodsPay) => {
  const status = await database.update(`users/${companyId}`, {
    company: { methodsPay },
  });
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, Algo salio mal' };
};

export const getCompanyWithUser = async (companyId) => {
  const data = await database.getDocument(`users/${companyId}`);
  if (data) return data;
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

/**
 * get all profiles with company association status
 * @param {String} companyId
 */
export const getProfilesWithStatus = async (companyId) => {
  const { profiles = [] } = await getCompany(companyId);
  const allProfiles = await profilesModel.getList();
  return allProfiles.map((profile) => {
    const studyParsed = {
      ...profile,
      isAvailable: profiles.includes(profile.id),
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

export const addNewProfile = async (companyId, profileId) => {
  const status = await database.update(`users/${companyId}`, {
    company: {
      profiles: firebase.firestore.FieldValue.arrayUnion(profileId),
    },
  });
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, Algo salio mal' };
};

export const deleteProfile = async (companyId, profileId) => {
  const status = await database.update(`users/${companyId}`, {
    company: {
      profiles: firebase.firestore.FieldValue.arrayRemove(profileId),
    },
  });
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, Algo salio mal' };
};

export const getAvailableStudies = async (companyId) => {
  try {
    const { studies = [] } = await getCompany(companyId);
    const allStudies = await studiesModel.getStudies();
    return allStudies.filter((study) => studies.includes(study.id));
  } catch (error) {
    return [];
  }
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
  getAvailableStudies,
  getRequests,
  getProfilesWithStatus,
  addNewProfile,
  deleteProfile,
};
