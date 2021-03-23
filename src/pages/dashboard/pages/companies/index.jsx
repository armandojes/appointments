import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CompaniesApproved from './pages/aproved';
import Requests from './pages/request';

const Companies = () => (
  <div>
    <Switch>
      <Route path="/dashboard/companies/requests" component={Requests} />
      <Route path="/dashboard/companies" component={CompaniesApproved} />
    </Switch>
  </div>
);

export default Companies;
