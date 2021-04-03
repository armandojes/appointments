import { Box, Hidden } from '@material-ui/core';
import { array, bool, func, string } from 'prop-types';
import React from 'react';
import Loading from '../../components/loading';
import Container from '../../components/main/Container';
import DateSelector from './components/dateSelector';
import Payout from './components/payout';
import RegisterPatient from './components/registerPatient';
import SelectBranch from './components/selectBranch';

const NewAppointmentView = ({ studies, isLoading, onStudyClick, getInputProps, branches, onBranchClick, branch, onTimeSelect, time, payoutType, onPayouTypeChange, onConfirm }) => (
  <>
    {isLoading && <Loading />}
    {!isLoading && (
      <Container>
        <RegisterPatient studies={studies} onStudyClick={onStudyClick} getInputProps={getInputProps} />
        <Hidden xsDown><Box marginBottom="2em" /></Hidden>
        <SelectBranch items={branches} onItemClick={onBranchClick} branch={branch} />
        <Hidden xsDown><Box marginBottom="5em" /></Hidden>
        <DateSelector onTimeSelect={onTimeSelect} time={time} />
        <Hidden xsDown><Box marginBottom="5em" /></Hidden>
        <Payout
          getInputProps={getInputProps}
          payoutType={payoutType}
          onPayouTypeChange={onPayouTypeChange}
          onTimeSelect={onConfirm}
        />
      </Container>
    )}
  </>
);

NewAppointmentView.propTypes = {
  studies: array.isRequired,
  isLoading: bool.isRequired,
  onStudyClick: func.isRequired,
  getInputProps: func.isRequired,
  branches: array.isRequired,
  onBranchClick: func.isRequired,
  branch: string.isRequired,
  onTimeSelect: func.isRequired,
  time: string.isRequired,
  payoutType: string.isRequired,
  onPayouTypeChange: func.isRequired,
  onConfirm: func.isRequired,
};

export default NewAppointmentView;
