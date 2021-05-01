/* eslint-disable import/prefer-default-export */
import database from 'src/core/models/database';

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
  return list;
};

export const remove = async (profileId) => {
  const status = await database.remove(`profiles/${profileId}`);
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

export default {
  create,
  getList,
  remove,
  getSingle,
  update,
};
