/* eslint-disable no-await-in-loop */
import 'firebase/auth';
import firebase from 'firebase';
import database from './database';

const auth = firebase.auth();

const errorDiccionary = {
  'auth/email-already-in-use': 'El correo ya se encuentra registrado',
  'auth/account-exists-with-different-credential': 'El correo ya se encuentra registrado',
  'auth/invalid-email': 'El correo no es válido',
  'auth/user-not-found': 'Correo o contraseña incorrecta',
  'auth/wrong-password': 'Correo o contraseña incorrecta',
  'auth/popup-closed-by-user': 'operacion cancelada por el usuario',
};

const errorTranslator = (errorMessage) => errorDiccionary[errorMessage] || errorMessage;

export const loginWithEmailAndPAssword = async ({ email, password }) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return { status: 'success', id: user.uid };
  } catch (error) {
    return { status: 'error', errorMessage: errorTranslator(error.code) };
  }
};

export const onUserChangeState = async (handler) => {
  auth.onAuthStateChanged(async (user) => {
    if (!user) return handler(user);
    let userData = null;
    for (let index = 0; (index < 5 && !userData); index + 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      userData = await database.getDocument(`users/${user.uid}`);
      delete userData.password;
      delete userData.createdAt;
      delete userData.updatedAt;
    }
    return handler(userData);
  });
};

/**
 * close session user
 */
export const singOut = async () => {
  const status = await auth.signOut();
  return status;
};
