/* eslint-disable no-undef */
import React from 'react';
import { getAvailableStudies } from 'src/core/models/companies';
import branchesModel from '../../core/models/branches';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import useSession from '../../session/useSession';
import NewAppointmentView from './view';

const NewAppointment = () => {
  const { getInputProps, values, setValues } = useForm({
    studies: [],
    isLoading: true,
    branches: [],
    branch: null,
  });
  const session = useSession();

  useFetch(async () => {
    const studies = await getAvailableStudies(session.id);
    const branches = await branchesModel.list();
    setValues({
      ...values,
      branches,
      isLoading: false,
      studies: studies.map((std) => ({ ...std, isSelected: false })),
    });
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
      branch: id,
    }));
  };

  const handleTimeSelect = (time) => {
    setValues((preValues) => ({ ...preValues, time }));
  };

  const handlePaoutTypeChange = (event) => {
    const value = event.currentTarget.id;
    setValues((prevValues) => ({
      ...prevValues,
      payoutType: value,
    }));
  };

  return (
    <>
      <NewAppointmentView
        payoutType={values.payoutType || ''}
        isLoading={values.isLoading}
        studies={values.studies}
        onStudyClick={handleStudyClick}
        getInputProps={getInputProps}
        branches={values.branches}
        onBranchClick={handleBranchClick}
        branch={values.branch}
        onTimeSelect={handleTimeSelect}
        time={values.time || ''}
        onPayouTypeChange={handlePaoutTypeChange}
      />
    </>
  );
};

export default NewAppointment;
