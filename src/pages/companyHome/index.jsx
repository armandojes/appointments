import React from 'react';
import { Redirect } from 'react-router';
import Container from 'src/components/main/Container';
import useSession from '../../session/useSession';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import styles from './styles.module.css';

const companyHome = () => {
  const session = useSession();

  if (session) return <Redirect to="/create-appointment" />;

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
