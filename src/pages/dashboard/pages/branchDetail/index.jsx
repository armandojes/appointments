/* eslint-disable no-unused-vars */
import { Box } from '@material-ui/core';
import React from 'react';
import DisabledDates from './components/disabledDates';
import Generalinfo from './components/general_info';
import Schedule from './components/schedule';

const BranchDetail = () => (
  <div>
    <Generalinfo />
    <Box paddingTop="1.5em" />
    <Schedule />
    <Box paddingTop="1.5em" />
    <DisabledDates />
  </div>
);

export default BranchDetail;
