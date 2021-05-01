import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import Appointments from './pages/appointments';
import AppointmentDetail from './pages/appointmentDetail';
import withAuth from '../../highOrderComponents/withAuth';
import Profiles from './pages/profiles';
import ProfileEditor from './pages/profileEditor';

const DashBoard = () => (
  <div className={styles.fullWidth}>
    <Container>
      <div className={styles.flexWrapper}>
        <div className={styles.menuContainer}>
          <MenuRight />
        </div>
        <div className={styles.contentContainer}>
          <Switch>
            <Route path="/dashboard" exact component={() => <Redirect to="/dashboard/branches" />} />
            <Route path="/dashboard/branches" exact component={withAuth(Branches, { admin: true })} />
            <Route path="/dashboard/branches/:branchId" component={withAuth(BranchDetail, { admin: true })} />
            <Route path="/dashboard/employments" component={withAuth(Employments, { admin: true })} />
            <Route path="/dashboard/companies" component={withAuth(Companies, { admin: true })} />
            <Route path="/dashboard/studies" component={withAuth(Studies, { admin: true })} />
            <Route path="/dashboard/profiles" exact component={withAuth(Profiles, { admin: true })} />
            <Route path="/dashboard/profiles/editor/:profileId?" exact component={withAuth(ProfileEditor, { admin: true })} />
            <Route path="/dashboard/study-editor/:studyId?" component={withAuth(StudyEditor, { admin: true })} />
            <Route path="/dashboard/company-editor/:companyId?" component={withAuth(CompanyEditor, { admin: true })} />
            <Route path="/dashboard/studies-for-company/:companyId?" component={withAuth(StudiesForCompany, { admin: true })} />
            <Route path="/dashboard/appointments" component={withAuth(Appointments, { admin: true, employment: true })} />
            <Route path="/dashboard/appointment/:appointmentId" component={withAuth(AppointmentDetail, { admin: true, employment: true })} />
          </Switch>
        </div>
      </div>
    </Container>
  </div>
);

export default withAuth(DashBoard, { admin: true, employment: true });
