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
};
