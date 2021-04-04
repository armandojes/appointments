import React, { useEffect } from 'react';
import { getAvailableStudies } from 'src/core/models/companies';
import branchesModel from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import useForm from 'src/hooks/useForm';
import useSession from 'src/session/useSession';
import NewAppointmentView from './view';
import validators from '../../helpers/validators';
import dates, { stringDateToDate, toStringDate } from '../../helpers/dates';

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

const NewAppointment = () => {
  const session = useSession();
  const { getInputProps, values, setValues, handleValidateForm } = useForm({
    studies: [],
    isLoading: true,
    branches: [],
    branch: null,
    currentStep: 1,
    disabledDates: [],
    stringDate: toStringDate(new Date()),
    stringTime: '',
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

  const handleConfirm = () => {};

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
    return null;
  }, [values]);

  // focus layout when changed current step
  useEffect(() => {
    if (values.currentStep === 2) document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    if (values.currentStep === 3) document.getElementById('date').scrollIntoView({ behavior: 'smooth' });
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

  return (
    <>
      <NewAppointmentView
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
      />
    </>
  );
};

export default NewAppointment;
