import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import companyModel from 'src/core/models/companies';
import useFetch from '../../../../hooks/useFetch';
import useNotification from '../../../../notifications/useSession';
import View from './view';

const StudiesForCompany = () => {
  const setNotification = useNotification();
  const { companyId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState({});
  const [studies, setStudies] = useState([]);
  const history = useHistory();

  const handleFetch = async () => {
    const companyDataResponse = await companyModel.getCompany(companyId);
    if (!companyDataResponse) {
      history.replace('/dashboard/companies');
    } else {
      const studiesResponse = await companyModel.getStudiesWithStatus(companyId);
      setCompanyData(companyDataResponse);
      setStudies(studiesResponse);
      setLoading(false);
    }
  };

  const handleItemStatusToogle = async ({ id, isAvailable }) => {
    setStudies((currentStudies) => currentStudies.map((study) => {
      if (study.id !== id) return study;
      return { ...study, isLoading: true };
    }));
    if (isAvailable) {
      const response = await companyModel.deleteStudy(companyId, id);
      await handleFetch();
      if (response.status === 'success') {
        setNotification({ type: 'success', message: 'El estudio se eliminó correctamente' });
      } else {
        setNotification({ type: 'error', message: response.errorMessage });
      }
    } else {
      const response = await companyModel.addNewStudy(companyId, id);
      await handleFetch();
      if (response.status === 'success') {
        setNotification({ type: 'success', message: 'El estudio se agregó correctamente' });
      } else {
        setNotification({ type: 'error', message: response.errorMessage });
      }
    }
  };

  useFetch(handleFetch);

  return (
    <View
      companyName={companyData.name || ''}
      isLoading={isLoading}
      items={studies}
      onItemStatusToggle={handleItemStatusToogle}
    />
  );
};

export default StudiesForCompany;
