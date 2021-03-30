import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '../../components/main/Container';
import MenuRight from './components/menu_rigth';
import Branches from './pages/branches';
import styles from './styles.module.css';
import BranchDetail from './pages/branchDetail';
import Employments from './pages/employments';
import Companies from './pages/companies';
import Studies from './pages/studies';
import StudyEditor from './pages/studyEditor';
import StudiesForCompany from './pages/studiesForCompany';
import CompanyEditor from './pages/companyEditor';

const DashBoard = () => (
  <div className={styles.fullWidth}>
    <Container>
      <div className={styles.flexWrapper}>
        <div className={styles.menuContainer}>
          <MenuRight />
        </div>
        <div className={styles.contentContainer}>
          <Switch>
            <Route path="/dashboard/branches" exact component={Branches} />
            <Route path="/dashboard/branches/:branchId" component={BranchDetail} />
            <Route path="/dashboard/employments" component={Employments} />
            <Route path="/dashboard/companies" component={Companies} />
            <Route path="/dashboard/studies" component={Studies} />
            <Route path="/dashboard/study-editor/:studyId?" component={StudyEditor} />
            <Route path="/dashboard/company-editor/:companyId?" component={CompanyEditor} />
            <Route path="/dashboard/studies-for-company/:companyId?" component={StudiesForCompany} />
          </Switch>
        </div>
      </div>
    </Container>
  </div>
);

export default DashBoard;
