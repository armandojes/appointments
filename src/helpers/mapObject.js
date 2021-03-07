const mapObjects = (object, handler) => {
  const keys = Object.keys(object);
  return keys.map((currentKey) => {
    const currentValue = object[currentKey];
    return handler(currentValue, currentKey);
  });
};

export default mapObjects;
