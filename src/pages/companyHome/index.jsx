import React from 'react';
import Container from 'src/components/main/Container';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import styles from './styles.module.css';

const companyHome = () => (
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

export default companyHome;
