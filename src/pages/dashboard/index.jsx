import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '../../components/main/Container';
import MenuRight from './components/menu_rigth';
import Branches from './pages/branches';
import styles from './styles.module.css';
import BranchConfig from './pages/branchConfig';

const DashBoard = () => (
  <Container>
    <div className={styles.flexWrapper}>
      <div className={styles.menuContainer}>
        <MenuRight />
      </div>
      <div className={styles.contentContainer}>
        <Switch>
          <Route path="/dashboard/branches" exact component={Branches} />
          <Route path="/dashboard/branches/:branchId" component={BranchConfig} />
        </Switch>
      </div>
    </div>
  </Container>
);

export default DashBoard;
