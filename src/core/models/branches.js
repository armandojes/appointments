import database from './database';

/**
 * get branch list
 */
export const list = async () => {
  const fetcher = database.getList('branches', null, null, []);
  const branches = await fetcher.next();
  return branches.length ? branches : null;
};

export default {
  list,
};
