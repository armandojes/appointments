import firebase from 'firebase';
import database from './database';

export const getStudies = async () => {
  const stidiesList = await database.getList('studies', null, null, null).next();
  return stidiesList;
};

export const createStudy = async (data) => {
  const securedata = {
    title: data.title,
    indications: data.indications || '',
  };
  const status = await database.create('studies', securedata);
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, algo salió mal' };
};

export const updateStudy = async (stidyId, data) => {
  const securedata = {
    title: data.title,
    indications: data.indications || '',
  };
  const status = await database.update(`studies/${stidyId}`, securedata);
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, algo salió mal' };
};

export const getStudy = async (studyId) => {
  const data = await database.getDocument(`/studies/${studyId}`);
  return data;
};

export const deleteStudy = async (studyId) => {
  const status = await database.remove(`studies/${studyId}`);
  await database.updateList('users', [['type', '==', 'companyManager']], {
    company: {
      studies: firebase.firestore.FieldValue.arrayRemove(studyId),
    },
  });
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, algo salió mal' };
};

export default {
  getStudies,
  createStudy,
  updateStudy,
};
