/* eslint-disable no-unused-vars */
import { Box } from '@material-ui/core';
import React from 'react';
import Generalinfo from './components/general_info';
import Schedule from './components/schedule';

const BranchDetail = () => (
  <div>
    <Generalinfo />
    <Box paddingTop="1.5em" />
    <Schedule />
  </div>
);

export default BranchDetail;
