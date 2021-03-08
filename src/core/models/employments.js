/* eslint-disable no-unused-vars */
export const createNewEmployment = async (data) => {
  await new Promise((r) => setTimeout(r, 1000));
  return { status: 'error', errorMessage: 'some error ocuurred!' };
};

export default {
  createNewEmployment,
};
