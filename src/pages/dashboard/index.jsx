import React from 'react';
import Container from '../../components/main/Container';
import MenuRight from './components/menu_rigth';
import styles from './styles.module.css';

const DashBoard = () => (
  <Container>
    <div className={styles.flexWrapper}>
      <div className={styles.menuContainer}>
        <MenuRight />
      </div>
      <div className={styles.contentContainer}>contentHere</div>
    </div>
  </Container>
);

export default DashBoard;
