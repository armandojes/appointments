import React, { useEffect } from 'react';
import { getAvailableStudies } from 'src/core/models/companies';
import branchesModel from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import useForm from 'src/hooks/useForm';
import useSession from 'src/session/useSession';
import { useHistory } from 'react-router';
import NewAppointmentView from './view';
import validators from '../../helpers/validators';
import dates, { stringDateToDate, toStringDate } from '../../helpers/dates';
import { getAvailableTimes, saveAppointment } from '../../core/models/appointments';

const step1Validators = {
  patientName: validators.userFullName,
  studies: (studies, otherValues) => {
    const someStudySelected = studies.some((currentStudy) => currentStudy.isSelected);
    if (someStudySelected) return false;
    if (otherValues.otherStudy) return false;
    return 'Selecciona almenos un estudio';
  },
};

const step2Validators = {
  branch: (value) => (!value ? 'Selecciona una sucursal' : false),
};

const step3Validators = {
  stringDate: (value) => (!value ? 'Selecciona una fecha' : false),
  stringTime: (value) => (!value ? 'Selecciona una hora' : false),
};

const step4Validators = {
  payoutType: (value) => (!value ? 'Seleccina un método de pago' : false),
};

const NewAppointment = () => {
  const history = useHistory();
  const session = useSession();
  const { getInputProps, values, setValues, handleValidateForm } = useForm({
    studies: [],
    isLoading: true,
    branches: [],
    branch: null,
    currentStep: 1,
    disabledDates: [],
    error: '',
    stringDate: toStringDate(new Date()), // date selected by user
    stringTime: '', // time selected by user
    times: [], // available times filtered
  });

  const handleStudyClick = (event) => {
    const idClicked = event.currentTarget.id;
    setValues((prevVals) => ({
      ...prevVals,
      studies: prevVals.studies.map((currentStudy) => {
        if (currentStudy.id === idClicked) return { ...currentStudy, isSelected: !currentStudy.isSelected };
        return currentStudy;
      }),
    }));
  };

  const handleBranchClick = (event) => {
    const { id } = event.currentTarget;
    setValues((prevVals) => ({
      ...prevVals,
      stringDate: toStringDate(new Date()),
      stringTime: '',
      branch: id,
    }));
  };

  const handleDateSelect = (date) => {
    setValues((prevVals) => ({
      ...prevVals,
      stringDate: dates.toStringDate(date),
      stringTime: '',
    }));
  };

  const handleTimeSelect = (stringTime) => {
    setValues((preValues) => ({
      ...preValues,
      stringTime,
    }));
  };

  const handlePaoutTypeChange = (event) => {
    const value = event.currentTarget.id;
    setValues((prevValues) => ({
      ...prevValues,
      payoutType: value,
    }));
  };

  const setCurrentStep = (step) => setValues((preValues) => ({ ...preValues, currentStep: step }));

  const handleConfirm = async () => {
    const errorsStep1 = handleValidateForm(step1Validators);
    if (Object.values(errorsStep1).length) {
      setValues((prevValues) => ({ ...prevValues, errorMessageAtStep1: Object.values(errorsStep1)[0], currentStep: 1 }));
      setTimeout(() => setValues((prevValues) => ({ ...prevValues, errorMessageAtStep1: '' })), 7000);
      return null;
    }
    const errorsStep2 = handleValidateForm(step2Validators);
    if (Object.values(errorsStep2).length) {
      setValues((prevValues) => ({ ...prevValues, errorMessageAtStep2: Object.values(errorsStep2)[0], currentStep: 2 }));
      setTimeout(() => setValues((prevValues) => ({ ...prevValues, errorMessageAtStep2: '' })), 7000);
      return null;
    }
    const errorsStep3 = handleValidateForm(step3Validators);
    if (Object.values(errorsStep3).length) {
      setValues((prevValues) => ({ ...prevValues, errorMessageAtStep3: Object.values(errorsStep3)[0], currentStep: 3 }));
      setTimeout(() => setValues((prevValues) => ({ ...prevValues, errorMessageAtStep3: '' })), 7000);
      return null;
    }
    const errorsStep4 = handleValidateForm(step4Validators);
    if (Object.values(errorsStep4).length) {
      setValues((prevValues) => ({ ...prevValues, errorMessageAtStep4: Object.values(errorsStep4)[0], currentStep: 4 }));
      setTimeout(() => setValues((prevValues) => ({ ...prevValues, errorMessageAtStep4: '' })), 7000);
      return null;
    }
    setValues((prev) => ({ ...prev, isLoading: true }));
    const response = await saveAppointment({
      ...values,
      studies: values.studies.filter((std) => std.isSelected),
    });
    if (response.status === 'success') {
      history.push(`/appointment/${response.id}`);
      return null;
    }

    if (response.status === 'error') {
      setValues((prev) => ({ ...prev, isLoading: false, error: response.errorMessage }));
      return null;
    }
    return null;
  };

  // set current step when required entries from previous steps are filled
  useEffect(() => {
    if (values.currentStep === 1) {
      const errors = handleValidateForm(step1Validators, true);
      if (!Object.values(errors).length) return setCurrentStep(2);
    }
    if (values.currentStep === 2) {
      const errors = handleValidateForm(step2Validators, true);
      if (!Object.values(errors).length) return setCurrentStep(3);
    }
    if (values.currentStep === 3) {
      const errors = handleValidateForm(step3Validators, true);
      if (!Object.values(errors).length) return setCurrentStep(4);
    }
    return null;
  }, [values]);

  // focus layout when changed current step
  useEffect(() => {
    if (values.currentStep === 2) document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    if (values.currentStep === 3) document.getElementById('date').scrollIntoView({ behavior: 'smooth' });
    if (values.currentStep === 4) document.getElementById('payout').scrollIntoView({ behavior: 'smooth' });
  }, [values.currentStep]);

  // fetch initial data
  useFetch(async () => {
    const studies = await getAvailableStudies(session.id);
    const branches = await branchesModel.list();
    setValues((prev) => ({
      ...prev,
      branches,
      isLoading: false,
      studies: studies.map((std) => ({ ...std, isSelected: false })),
    }));
  });

  // fetch disabled dates of currentBranch
  useFetch(async () => {
    if (values.branch) {
      const disabledDates = await branchesModel.getDisabledStringDates(values.branch);
      setValues((prevVals) => ({ ...prevVals, disabledDates }));
    }
  }, [values.branch]);

  // fetchAvailableTimes
  useFetch(async () => {
    if (values.branch && values.stringDate) {
      if (values.errorMessageAtStep3) setValues((prev) => ({ ...prev, errorMessageAtStep3: '' }));
      const availableTimes = await getAvailableTimes(values.branch, values.stringDate);
      setValues((prevValues) => ({ ...prevValues, times: availableTimes }));
      if (!availableTimes.length) {
        setValues((preValues) => ({
          ...preValues,
          errorMessageAtStep3: 'No hay citas disponibles para la fecha seleccionada',
        }));
      }
    }
  }, [values.stringDate, values.branch]);

  return (
    <>
      <NewAppointmentView
        errorMessageAtStep1={values.errorMessageAtStep1}
        errorMessageAtStep2={values.errorMessageAtStep2}
        errorMessageAtStep3={values.errorMessageAtStep3}
        errorMessageAtStep4={values.errorMessageAtStep4}
        disabledDates={values.disabledDates}
        payoutType={values.payoutType || ''}
        isLoading={values.isLoading}
        studies={values.studies}
        onStudyClick={handleStudyClick}
        getInputProps={getInputProps}
        branches={values.branches}
        onBranchClick={handleBranchClick}
        branch={values.branch || ''}
        onTimeSelect={handleTimeSelect}
        stringTime={values.stringTime || ''}
        onPayouTypeChange={handlePaoutTypeChange}
        currentStep={values.currentStep}
        onConfirm={handleConfirm}
        onDateSelect={handleDateSelect}
        date={stringDateToDate(values.stringDate)}
        times={values.times}
        error={values.error}
      />
    </>
  );
};

export default NewAppointment;
