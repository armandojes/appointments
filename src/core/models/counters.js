import database from 'src/core/models/database';
import firebase from 'firebase';
import slug from 'slug';
import limitText from '../../helpers/limitText';

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

export const getCompanyCounter = async (name) => {
  const status = await database.update('info/counters', {
    companies: firebase.firestore.FieldValue.increment(1),
  });

  if (!status) {
    console.log('creating...');
    await createInitialCounters();
    await database.update('info/counters', {
      companies: firebase.firestore.FieldValue.increment(1),
    });
  }
  let nameParsed = slug(limitText(name, 30));
  nameParsed = nameParsed.toUpperCase();
  const counters = await database.getDocument('info/counters');
  return `${nameParsed}-${addZero(counters.companies)}`;
};

window.getCompanyCounter = getCompanyCounter;
