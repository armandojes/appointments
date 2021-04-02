const ducks = () => {
  const updaters = {};

  const createActionCreator = (actionType, updater) => {
    updaters[actionType] = updater;
    return (payload) => ({
      type: actionType,
      payload,
    });
  };

  const reducer = (state, action) => {
    if (updaters[action.type]) {
      return updaters[action.type](state, action.payload);
    }
    return state;
  };

  return {
    reducer,
    createActionCreator,
  };
};

export default ducks;
