import { Box, Hidden } from '@material-ui/core';
import { array, bool, func, string } from 'prop-types';
import React from 'react';
import Loading from '../../components/loading';
import Container from '../../components/main/Container';
import RegisterPatient from './components/registerPatient';
import SelectBranch from './components/selectBranch';

const NewAppointmentView = ({ studies, isLoading, onStudyClick, getInputProps, branches, onBranchClick, branch }) => (
  <>
    {isLoading && <Loading />}
    {!isLoading && (
      <Container>
        <RegisterPatient studies={studies} onStudyClick={onStudyClick} getInputProps={getInputProps} />
        <Hidden xsDown><Box marginBottom="2em" /></Hidden>
        <SelectBranch items={branches} onItemClick={onBranchClick} branch={branch} />
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
};

export default NewAppointmentView;
