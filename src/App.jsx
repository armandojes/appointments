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

const App = () => (
  <BrowserRouter>
    <SessionProvider>
      <ThemeProvider>
        <PickersProvider>
          <Header />
          <Switch>
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/company-home" component={companyHome} />
          </Switch>
        </PickersProvider>
      </ThemeProvider>
    </SessionProvider>
  </BrowserRouter>
);

export default App;
