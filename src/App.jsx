import React from 'react';
import './initializeFirebase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './pages/dashboard';
import './core/models/appointments';
import ThemeProvider from './themeProvider';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <Switch>
        <Route path="/dashboard" component={DashBoard} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
