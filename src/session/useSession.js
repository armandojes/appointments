import { useContext } from 'react';
import sessionContext from './context';

const useSession = () => {
  const session = useContext(sessionContext);
  return session;
};

export default useSession;
