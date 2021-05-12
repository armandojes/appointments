import { Box, Hidden } from '@material-ui/core';
import { array, bool, func, instanceOf, number, string } from 'prop-types';
import React from 'react';
import Loading from '../../components/loading';
import Button from '../../components/main/button';
import Container from '../../components/main/Container';
import Text from '../../components/main/text';
import DateSelector from './components/dateSelector';
import Payout from './components/payout';
import RegisterPatient from './components/registerPatient';
import SelectBranch from './components/selectBranch';
import styles from './styles.module.css';

const NewAppointmentView = ({ onPatientBirthDateChange, onPatientBirthDateBlur, onProfileClick, profiles, methodsPay, branchNameSelected, companyManager, companyName, error, errorMessageAtStep1, errorMessageAtStep2, errorMessageAtStep3, errorMessageAtStep4, times, date, onDateSelect, studies, isLoading, onStudyClick, getInputProps, branches, onBranchClick, branch, onTimeSelect, stringTime, payoutType, onPayouTypeChange, onConfirm, currentStep, shouldDisableDate }) => (
  <>
    {!isLoading && error && (
      <Container>
        <div className={styles.errorWrapper}>
          <div className={styles.card}>
            <Text fontSize="2em" color="white" textAlign="center">Error</Text>
            <Text textAlign="center" fontSize="1.5em" color="white">{error}</Text>
            <Button className={styles.butonError} onClick={() => window.location.reload()}>Volver a intentar</Button>
          </div>
        </div>
      </Container>
    )}
    {isLoading && <Loading />}
    {!isLoading && !error && (
      <Container>
        <RegisterPatient
          onPatientBirthDateChange={onPatientBirthDateChange}
          onPatientBirthDateBlur={onPatientBirthDateBlur}
          companyName={companyName}
          companyManager={companyManager}
          studies={studies}
          profiles={profiles}
          onStudyClick={onStudyClick}
          onProfileClick={onProfileClick}
          getInputProps={getInputProps}
          errorMessage={errorMessageAtStep1}
        />

        {currentStep >= 2 && (
          <div className={styles.fadeIn} id="register">
            <Hidden xsDown><Box marginBottom="2em" /></Hidden>
            <SelectBranch
              errorMessage={errorMessageAtStep2}
              items={branches}
              onItemClick={onBranchClick}
              branch={branch}
            />
          </div>
        )}

        {currentStep >= 3 && (
          <div className={styles.fadeIn} id="date">
            <Hidden xsDown><Box marginBottom="5em" /></Hidden>
            <DateSelector
              branchName={branchNameSelected}
              errorMessage={errorMessageAtStep3}
              times={times}
              onTimeSelect={onTimeSelect}
              stringTime={stringTime}
              shouldDisableDate={shouldDisableDate}
              onDateSelect={onDateSelect}
              date={date}
            />
          </div>
        )}
        {currentStep >= 4 && (
          <div className={styles.fadeIn} id="payout">
            <Hidden xsDown><Box marginBottom="5em" /></Hidden>
            <Payout
              errorMessage={errorMessageAtStep4}
              getInputProps={getInputProps}
              payoutType={payoutType}
              onPayouTypeChange={onPayouTypeChange}
              onConfirm={onConfirm}
              methodsPay={methodsPay}
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
  shouldDisableDate: func.isRequired,
  onDateSelect: func.isRequired,
  date: instanceOf(Date).isRequired,
  times: array.isRequired,
  errorMessageAtStep1: string.isRequired,
  errorMessageAtStep2: string.isRequired,
  errorMessageAtStep3: string.isRequired,
  errorMessageAtStep4: string.isRequired,
  error: string.isRequired,
  companyManager: string.isRequired,
  companyName: string.isRequired,
  branchNameSelected: string.isRequired,
  methodsPay: array.isRequired,
  profiles: array.isRequired,
  onProfileClick: func.isRequired,
  onPatientBirthDateBlur: func.isRequired,
  onPatientBirthDateChange: func.isRequired,
};

export default NewAppointmentView;
