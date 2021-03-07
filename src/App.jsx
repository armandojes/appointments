import React from 'react';
import './initializeFirebase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './pages/dashboard';
import './core/models/appointments';
import ThemeProvider from './themeProvider';
import PickersProvider from './MuiPickersUtilsProvider';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <PickersProvider>
        <Switch>
          <Route path="/dashboard" component={DashBoard} />
        </Switch>
      </PickersProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
