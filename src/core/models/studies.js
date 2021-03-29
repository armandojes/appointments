import database from './database';

export const getStudies = async () => {
  const stidiesList = await database.getList('studies', null, null, null).next();
  return stidiesList;
};

export default {
  getStudies,
};
