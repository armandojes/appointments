import React from 'react';
import './initializeFirebase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './pages/dashboard';
import './core/models/appointments';
import ThemeProvider from './themeProvider';
import PickersProvider from './MuiPickersUtilsProvider';
import Header from './components/header';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <PickersProvider>
        <Header />
        <Switch>
          <Route path="/dashboard" component={DashBoard} />
        </Switch>
      </PickersProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
