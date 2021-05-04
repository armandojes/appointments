const sortItems = (array, keyname, order = 'ASC') => {
  const orderedArray = [...array];
  const arrayOfKeynames = keyname.split('.');
  const keyNameANidation = arrayOfKeynames.length;

  orderedArray.sort((objectA, objectB) => {
    if (keyNameANidation === 1) {
      const a = objectA[keyname].toLowerCase();
      const b = objectB[keyname].toLowerCase();
      if (a > b) return order === 'ASC' ? 1 : -1;
      if (b > a) return order === 'ASC' ? -1 : 1;
      return 0;
    }
    if (keyNameANidation === 2) {
      const a = objectA[arrayOfKeynames[0]][arrayOfKeynames[1]].toLowerCase();
      const b = objectB[arrayOfKeynames[0]][arrayOfKeynames[1]].toLowerCase();
      if (a > b) return order === 'ASC' ? 1 : -1;
      if (b > a) return order === 'ASC' ? -1 : 1;
      return 0;
    }
    return array;
  });
  return orderedArray;
};

export default sortItems;
