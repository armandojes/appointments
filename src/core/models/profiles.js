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

export default {
  create,
};
