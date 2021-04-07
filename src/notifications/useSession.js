import { useContext } from 'react';
import notificationCOntent from './context';

const useNotification = () => {
  const notification = useContext(notificationCOntent);
  return notification;
};

export default useNotification;
