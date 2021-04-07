import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Container from 'src/components/main/Container';
import useSession from '../../session/useSession';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import styles from './styles.module.css';

const companyHome = () => {
  const history = useHistory();
  const session = useSession();

  useEffect(() => {
    if (session) {
      if (session.type === 'employment') history.replace('/dashboard/appointments');
      else if (session.type === 'admin') history.replace('/dashboard');
      else if (session.type === 'companyManager') history.replace('/create-appointment');
    }
  }, [session]);

  return (
    <Container className={styles.container}>
      <Header />
      <div className={styles.bodyWrapper}>
        <div className={styles.loginWrapper}>
          <Login />
        </div>
        <div className={styles.registerWrapper}>
          <Register />
        </div>
      </div>
    </Container>
  );
};

export default companyHome;
