export const companyName = (values) => {
  const message = 'El nombre de la empresa no es válida';
  if (!values) return message;
  if (values.toString().length < 3) return message;
  return null;
};

export const userFullName = (values) => {
  const message = 'El nombre del usuario no es valido';
  if (!values) return message;
  if (values.toString().length < 3) return message;
  return null;
};

export const email = (value) => {
  const isValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
  if (!isValid) return 'El correo no es válido';
  return null;
};

export const phone = (value) => {
  const message = 'El número de teléfono no es valido';
  if (!value) return message;
  if (value.toString().length < 5) return message;
  return null;
};

export const razonSocial = (value) => {
  const message = 'Razon social no válido';
  if (!value) return message;
  if (value.toString().length < 5) return message;
  return null;
};

export const address = (value) => {
  const message = 'La dirección no es válida';
  if (!value) return message;
  if (value.toString().length < 5) return message;
  return null;
};

export const rfc = (value) => {
  const message = 'FRC no válido';
  if (!value) return message;
  if (value.toString().length < 5) return message;
  return null;
};

export const password = (value) => {
  const message = 'La contraseña debe tener almenos 8 caracteres';
  if (!value) return message;
  if (value.toString().length < 8) return message;
  return null;
};

export const patientNameValidator = (values) => {
  const message = 'El nombre del paciente no es válido';
  if (!values) return message;
  if (values.toString().length < 3) return message;
  return null;
};

export const patientBirthDate = (val) => {
  const errorMessage = 'La fecha debe tener el siguente formato DD/MM/AAAA';
  if (!val) return false;
  const dateSplited = val.split('/');
  if (dateSplited.length !== 3) return errorMessage;
  const day = dateSplited[0].replace(/[^\d.-]/g, '');
  const month = dateSplited[1].replace(/[^\d.-]/g, '');
  const year = dateSplited[2].replace(/[^\d.-]/g, '');
  if ((day.length !== 1 && day.length !== 2) || (month.length !== 1 && month.length !== 2) || (year.length !== 4)) return errorMessage;
  return null;
};

export default {
  companyName,
  userFullName,
  email,
  phone,
  razonSocial,
  address,
  rfc,
  password,
  patientNameValidator,
  patientBirthDate,
};

window.patientBirthDate = patientBirthDate;
