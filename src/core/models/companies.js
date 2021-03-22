import database from './database';

export const createRequestForNewCompany = async (data) => {
  const compnySchema = {
    companyName: data.companyName,
    userFullName: data.userFullName,
    userEmail: data.userEmail,
    userPhone: data.userPhone,
    companyRazonSocial: data.companyRazonSocial,
    companyAddress: data.companyAddress,
    companyRFC: data.companyRFC,
    companyEmail: data.companyEmail,
  };
  const status = await database.create('/requestNewCompanies', compnySchema);
  return { status: status ? 'success' : 'error' };
};

export default {
  createRequestForNewCompany,
};
