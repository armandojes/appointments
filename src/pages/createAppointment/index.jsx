/* eslint-disable no-undef */
import React from 'react';
import { getAvailableStudies } from 'src/core/models/companies';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import useSession from '../../session/useSession';
import NewAppointmentView from './view';

const NewAppointment = () => {
  const { getInputProps, values, setValues } = useForm({ studies: [], isLoading: true });
  const session = useSession();

  useFetch(async () => {
    const studies = await getAvailableStudies(session.id);
    setValues({
      ...values,
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

  return (
    <>
      <NewAppointmentView
        isLoading={values.isLoading}
        studies={values.studies}
        onStudyClick={handleStudyClick}
        getInputProps={getInputProps}
      />
    </>
  );
};

export default NewAppointment;
