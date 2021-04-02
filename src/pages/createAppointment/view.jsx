import { array, bool, func } from 'prop-types';
import React from 'react';
import Loading from '../../components/loading';
import Container from '../../components/main/Container';
import RegisterPatient from './components/registerPatient';

const NewAppointmentView = ({ studies, isLoading, onStudyClick, getInputProps }) => (
  <>
    {isLoading && <Loading />}
    {!isLoading && (
      <Container>
        <RegisterPatient studies={studies} onStudyClick={onStudyClick} getInputProps={getInputProps} />
      </Container>
    )}
  </>
);

NewAppointmentView.propTypes = {
  studies: array.isRequired,
  isLoading: bool.isRequired,
  onStudyClick: func.isRequired,
  getInputProps: func.isRequired,
};

export default NewAppointmentView;
