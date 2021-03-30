/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { createStudy, getStudy, updateStudy } from '../../../../core/models/studies';
import useErrorMessage from '../../../../hooks/useErrorMessage';
import useFetch from '../../../../hooks/useFetch';
import useForm from '../../../../hooks/useForm';
import View from './view';

const validators = {
  title: (val) => (!val || val.toString().length < 2 ? 'El titulo es requerido' : false),
  price: (val) => (!val || val.toString().length < 1 ? 'El precio es requerido' : false),
};

const StudyEditor = () => {
  const [isLoading, setLoading] = useState(false);
  const { getInputProps, handleValidateForm, values, setValues } = useForm();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const { studyId } = useParams();
  const history = useHistory();

  const handleSave = async () => {
    const errors = handleValidateForm(validators);
    if (Object.values(errors).length) {
      setErrorMessage(Object.values(errors)[0]);
    } else {
      setLoading(true);
      const response = await createStudy(values);
      if (response.status === 'error') {
        setLoading(false);
        setErrorMessage(response.errorMessage);
      } else {
        setLoading(false);
        history.replace('/dashboard/studies');
      }
    }
  };

  const handleUpdate = async () => {
    const errors = handleValidateForm(validators);
    if (Object.values(errors).length) {
      setErrorMessage(Object.values(errors)[0]);
    } else {
      setLoading(true);
      const response = await updateStudy(studyId, values);
      if (response.status === 'error') {
        setLoading(false);
        setErrorMessage(response.errorMessage);
      } else {
        setLoading(false);
        history.replace('/dashboard/studies');
      }
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleFetch = async () => {
    if (studyId) {
      setLoading(true);
      const stdudyData = await getStudy(studyId);
      if (!stdudyData) handleCancel();
      else {
        setValues({
          title: stdudyData.title,
          price: stdudyData.price,
          indications: stdudyData.indications,
        });
        setLoading(false);
      }
    }
  };

  useFetch(handleFetch);

  return (
    <View
      errorMessage={errorMessage}
      isEditing={!!studyId}
      getInputProps={getInputProps}
      onSave={studyId ? handleUpdate : handleSave}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  );
};

export default StudyEditor;