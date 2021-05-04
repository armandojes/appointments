import firebase from 'firebase';
import database from 'src/core/models/database';
import sortItems from '../../helpers/sortItems';

export const create = async (data) => {
  const secureData = {
    indications: data.indications || '',
    studies: data.studies || [],
    title: data.title,
  };

  const status = await database.create('/profiles', secureData);
  return status
    ? { status: 'success' }
    : { status: 'error', errorMessage: 'Error algo salio mal' };
};

export const getList = async () => {
  const list = await database.getList('profiles', null, null, null).next();
  return sortItems(list, 'title', 'ASC');
};

export const remove = async (profileId) => {
  const status = await database.remove(`profiles/${profileId}`);
  database.updateList('users', [['type', '==', 'companyManager']], {
    company: {
      profiles: firebase.firestore.FieldValue.arrayRemove(profileId),
    },
  });
  if (status) return { status: 'success' };
  return { status: 'error', errorMessage: 'Error, algo salió mal' };
};

export const getSingle = async (id) => {
  const data = await database.getDocument(`/profiles/${id}`);
  return data;
};

export const update = async (profileId, data) => {
  const secureData = {
    indications: data.indications || '',
    studies: data.studies || [],
    title: data.title,
  };

  const status = await database.update(`profiles/${profileId}`, secureData);
  return status
    ? { status: 'success' }
    : { status: 'error', errorMessage: 'Error algo salio mal' };
};

export const deleteStudyContained = async (studyId) => {
  await database.updateList('profiles', null, {
    studies: firebase.firestore.FieldValue.arrayRemove(studyId),
  });
};

export default {
  create,
  getList,
  remove,
  getSingle,
  update,
  deleteStudyContained,
};
