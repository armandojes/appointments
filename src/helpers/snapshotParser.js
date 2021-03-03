/* eslint-disable no-unused-vars */
import forEachObject from './forEachObject';

const transformIntoDate = (data) => {
  if (Array.isArray(data)) {
    return data.map((current) => transformIntoDate(current));
  }
  if (typeof data === 'object' && !data.toDate) {
    const objectTransformed = {};
    forEachObject(data, (value, keyname) => {
      objectTransformed[keyname] = transformIntoDate(value);
    });
    return objectTransformed;
  }
  if (typeof data === 'object' && data.toDate) {
    return data.toDate();
  }
  return data;
};

const snapShotParser = (snapshot) => {
  if (snapshot.docs) {
    return snapshot.docs.map((currentDoc) => {
      const data = currentDoc.data();
      data.id = currentDoc.id;
      return transformIntoDate(data);
    });
  }
  const data = snapshot.data();
  data.id = snapshot.id;
  return transformIntoDate(data);
};

export default snapShotParser;
