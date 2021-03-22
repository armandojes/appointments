import database from './database';

export const createRequestForNewCompany = async (data) => {
  const isEmailUsed = await database.getList('users', false, false, [['email', '==', data.userEmail]]).next();
  if (isEmailUsed && isEmailUsed.length) return { status: 'error', errorMessage: 'El correo ya se encuentra registrado' };

  const isEmailUsedAtRequest = await database.getList('requestNewCompanies', false, false, [['userEmail', '==', data.userEmail]]).next();
  if (isEmailUsedAtRequest && isEmailUsedAtRequest.length) return { status: 'error', errorMessage: 'El correo ya se encuentra registrado' };

  const compnySchema = {
    companyName: data.companyName,
    userFullName: data.userFullName,
    userEmail: data.userEmail,
    companyPhone: data.companyPhone,
    companyRazonSocial: data.companyRazonSocial,
    companyAddress: data.companyAddress,
    companyRFC: data.companyRFC,
    companyEmail: data.companyEmail,
  };
  const status = await database.create('/requestNewCompanies', compnySchema);
  return { status: status ? 'success' : 'error', errorMessage: !status ? 'error interno del servidor' : null };
};

export const getRequests = async () => {
  const data = await database.getList('requestNewCompanies', false, ['createdAt', 'desc']).next();
  return data;
};

export const deleteRequestCompany = async (compnyId) => {
  const result = await database.remove(`requestNewCompanies/${compnyId}`);
  if (result) return { status: 'success' };
  return { status: 'error' };
};

export default {
  createRequestForNewCompany,
  deleteRequestCompany,
};
