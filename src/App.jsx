import React from 'react';
import './initializeFirebase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './pages/dashboard';
import './core/models/appointments';
import ThemeProvider from './themeProvider';
import PickersProvider from './MuiPickersUtilsProvider';
import Header from './components/header';
import companyHome from './pages/companyHome';
import SessionProvider from './session/provider';
import CreateAppointments from './pages/createAppointment';
import NotificatinProvider from './notifications/provider';
import AppointmentSummary from './pages/appointmentSummary';
import StudyHistory from './pages/studyHistory';
import FloatingAds from './components/floatingAds';

const App = () => (
  <BrowserRouter>
    <SessionProvider>
      <NotificatinProvider>
        <ThemeProvider>
          <PickersProvider>
            <FloatingAds />
            <Header />
            <Switch>
              <Route path="/" exact component={companyHome} />
              <Route path="/dashboard" component={DashBoard} />
              <Route path="/create-appointment" component={CreateAppointments} />
              <Route path="/appointment/:appointmentId" component={AppointmentSummary} />
              <Route path="/study-history" component={StudyHistory} />
            </Switch>
          </PickersProvider>
        </ThemeProvider>
      </NotificatinProvider>
    </SessionProvider>
  </BrowserRouter>
);

export default App;
