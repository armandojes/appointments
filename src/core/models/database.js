/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import firebase from 'firebase';
import snapShotParser from '../../helpers/snapshotParser';

const firestore = firebase.firestore();

/**
 * get single document's data
 * @param {string} documentPath
 * @return {Promise<{}|boolean>} promise reolves with document data or null
 */
export const getDocument = async (documentPath) => {
  try {
    const snapshot = await firestore.doc(documentPath).get();
    return snapShotParser(snapshot);
  } catch (error) {
    console.log('getDocumentError', error.toString());
    return null;
  }
};

/**
   * create a new document
   * @param {string} path document path
   * @param {{}} data data to save
   * @returns {Promise<{}|Boolean>}
  */
export const create = async (path, data, customId = null) => {
  try {
    if (customId) {
      const documentCreatedPath = `${path}/${customId}`;
      await firestore.doc(documentCreatedPath).set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...data,
      });
      return await getDocument(documentCreatedPath);
    }
    const { path: documentCreatedPath } = await firestore.collection(path).add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    });
    return await getDocument(documentCreatedPath);
  } catch (error) {
    console.log('createError', error.toString());
    return null;
  }
};

/**
 * get list of items from a collection
 * @param {string} path - collection path
 * @param {Boolean|number} limit - limit result
 * @param {Array} orderBy - orderBy
 * @param {Array.<Array>} filters - filters
 */
export const getList = (path, limit = null, orderBy = null, filters = []) => {
  const fetcher = {
    end: false,
    startAfter: null,
    async next() {
      try {
        if (fetcher.end) return [];
        let query = firestore.collection(path);

        // generate filters
        if (filters) {
          for (const currentFilter of filters) {
            const keyname = currentFilter[0];
            const type = currentFilter[1];
            const value = currentFilter[2];
            query = query.where(keyname, type, value);
          }
        }

        // pagination and order
        if (orderBy) query = query.orderBy(orderBy[0], orderBy[1]);
        if (fetcher.startAfter) query = query.startAfter(fetcher.startAfter);
        if (limit) query = query.limit(limit);

        // getting data
        const snapshot = await query.get();
        if (snapshot.docs.length < limit || !limit) fetcher.end = true;
        if (snapshot.docs.length) fetcher.startAfter = snapshot.docs[snapshot.docs.length - 1];

        return snapShotParser(snapshot);
      } catch (error) {
        console.log('getListGeneratorError', error.toString());
        fetcher.end = true;
        return [];
      }
    },
  };
  return fetcher;
};

/**
 * delete a document
 * @param {string} path - document path
 * @return {Promise<Boolean>} operation result - only return false if exist an error
*/
export const remove = async (path) => {
  try {
    await firestore.doc(path).delete();
    return true;
  } catch (error) {
    console.log('removeError', error.toString());
    return false;
  }
};

/**
 * delete documents list
 * @param {string} path - collection path
 * @param {Array<Array>} filters - array of filters
 * @return {Promise<boolean>} status of operation
 */
export const removeList = async (path, filters) => {
  try {
    let query = firestore.collection(path);

    // generate filters
    for (const currentFilter of filters) {
      const keyname = currentFilter[0];
      const type = currentFilter[1];
      const value = currentFilter[2];
      // @ts-ignore
      query = query.where(keyname, type, value);
    }

    const snapshot = await query.get();

    await Promise.all(snapshot.docs.map(async (doc) => doc.ref.delete()));

    return true;
  } catch (error) {
    console.log('removeListError', error.toString());
    return false;
  }
};

/**
 * update document
 * @param {string} path - document's path
 * @param {Object} data - data to update with merge
 * @return {Promise<Boolean>} - promise resolves with operation status
*/
export const update = async (path, data) => {
  try {
    const exist = await getDocument(path);
    if (!exist) return false;

    delete data.createdAt;
    delete data.updatedAt;
    delete data.id;
    await firestore.doc(path).set({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.log('updateError', error.toString());
    return false;
  }
};

/**
 * update list of documents
 * @param {string} path - collection path
 * @param {Array<Array>} filters - array of filters
 * @param {Object} data - data to update
 * @return {Promise<boolean>} status of operation
*/
export const updateList = async (path, filters = [], data) => {
  try {
    let query = firestore.collection(path);

    // secure date
    delete data.createdAt;
    delete data.updatedAt;
    delete data.id;

    // generate filters
    if (filters) {
      for (const currentFilter of filters) {
        const keyname = currentFilter[0];
        const type = currentFilter[1];
        const value = currentFilter[2];
        // @ts-ignore
        query = query.where(keyname, type, value);
      }
    }

    const snapshot = await query.get();

    await Promise.all(snapshot.docs.map(async (doc) => doc.ref.set({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true })));

    return true;
  } catch (error) {
    console.log('updateListError', error.toString());
    return false;
  }
};

export default {
  getDocument,
  create,
  getList,
  remove,
  removeList,
  update,
  updateList,
};
