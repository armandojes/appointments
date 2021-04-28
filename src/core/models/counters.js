import database from 'src/core/models/database';
import firebase from 'firebase';

export const addZero = (counter = 0) => {
  const maxLength = 6;
  let counterString = counter.toString();
  for (let index = counterString.length; index < maxLength; index += 1) {
    counterString = `0${counterString}`;
  }
  return counterString;
};

export const createInitialCounters = async () => {
  const initialCounters = { appointments: 0, companies: 0 };
  await database.create('info', initialCounters, 'counters');
};

export const getAppointmentCounters = async () => {
  const status = await database.update('info/counters', {
    appointments: firebase.firestore.FieldValue.increment(1),
  });

  if (!status) {
    console.log('creating...');
    await createInitialCounters();
    await database.update('info/counters', {
      appointments: firebase.firestore.FieldValue.increment(1),
    });
  }
  const counters = await database.getDocument('info/counters');
  return `IML-EMP-${addZero(counters.appointments)}`;
};
