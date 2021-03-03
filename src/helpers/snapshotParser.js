/* eslint-disable no-restricted-syntax */
const snapShotParser = (snapshot) => {
  if (snapshot.docs) {
    return snapshot.docs.map((currentDoc) => {
      const data = currentDoc.data();
      data.id = currentDoc.id;
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          if (data[key] && data[key].toDate) {
            data[key] = data[key].toDate();
          }
        }
      }
      return data;
    });
  }
  const data = snapshot.data();
  data.id = snapshot.id;
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (data[key] && data[key].toDate) {
        data[key] = data[key].toDate();
      }
    }
  }
  return data;
};

export default snapShotParser;
