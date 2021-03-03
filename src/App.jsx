import React from 'react';

import './initializeFirebase';
import './core/models/appointments';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './pages/dashboard';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={DashBoard} />
    </Switch>
  </BrowserRouter>
);

export default App;
