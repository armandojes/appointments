import { Box, Hidden } from '@material-ui/core';
import { array, bool, func, instanceOf, number, string } from 'prop-types';
import React from 'react';
import Loading from '../../components/loading';
import Container from '../../components/main/Container';
import DateSelector from './components/dateSelector';
import Payout from './components/payout';
import RegisterPatient from './components/registerPatient';
import SelectBranch from './components/selectBranch';
import styles from './styles.module.css';

const NewAppointmentView = ({ date, onDateSelect, studies, isLoading, onStudyClick, getInputProps, branches, onBranchClick, branch, onTimeSelect, stringTime, payoutType, onPayouTypeChange, onConfirm, currentStep, disabledDates }) => (
  <>
    {isLoading && <Loading />}
    {!isLoading && (
      <Container>
        <RegisterPatient studies={studies} onStudyClick={onStudyClick} getInputProps={getInputProps} />

        {currentStep >= 2 && (
          <div className={styles.fadeIn} id="register">
            <Hidden xsDown><Box marginBottom="2em" /></Hidden>
            <SelectBranch items={branches} onItemClick={onBranchClick} branch={branch} />
          </div>
        )}

        {currentStep >= 3 && (
          <div className={styles.fadeIn} id="date">
            <Hidden xsDown><Box marginBottom="5em" /></Hidden>
            <DateSelector onTimeSelect={onTimeSelect} stringTime={stringTime} disabledDates={disabledDates} onDateSelect={onDateSelect} date={date} />
          </div>
        )}
        {currentStep >= 4 && (
          <div className={styles.fadeIn} id="payout">
            <Hidden xsDown><Box marginBottom="5em" /></Hidden>
            <Payout
              getInputProps={getInputProps}
              payoutType={payoutType}
              onPayouTypeChange={onPayouTypeChange}
              onTimeSelect={onConfirm}
            />
          </div>
        )}
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
  stringTime: string.isRequired,
  payoutType: string.isRequired,
  onPayouTypeChange: func.isRequired,
  onConfirm: func.isRequired,
  currentStep: number.isRequired,
  disabledDates: array.isRequired,
  onDateSelect: func.isRequired,
  date: instanceOf(Date).isRequired,
};

export default NewAppointmentView;
