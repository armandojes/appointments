/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { func } from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { deleteStudy, getStudies } from 'src/core/models/studies';
import withAlert from 'src/highOrderComponents/withAlert';
import useFetch from 'src/hooks/useFetch';
import useNotification from '../../../../notifications/useSession';
import View from './view';

const Studies = ({ setAlert }) => {
  const setNotification = useNotification();
  const [studies, setStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const handleFetch = async () => {
    setIsLoading(true);
    const stidiesList = await getStudies();
    setStudies(stidiesList);
    setIsLoading(false);
  };

  useFetch(handleFetch);

  /**
   * delete stidie
   * @param {{}} param all item data
   */
  const handleDeleteItemWithAlert = ({ id }) => {
    setAlert({
      title: '¿Seguro quiere eliminar esta prueba?',
      message: 'Una vez ejecutada la acción no podrás recuperar la información',
      action: async () => {
        const response = await deleteStudy(id);
        await handleFetch();
        if (response.status === 'success') setNotification({ status: 'success', message: 'Estudio eliminado correctamente' });
        else setNotification({ status: 'error', message: response.errorMessage });
      },
    });
  };

  const handleEditItem = ({ id }) => {
    history.push(`/dashboard/study-editor/${id}`);
  };

  return (
    <View
      items={studies}
      isLoading={isLoading}
      onDeleteItem={handleDeleteItemWithAlert}
      onEditItem={handleEditItem}
    />
  );
};

Studies.propTypes = {
  setAlert: func.isRequired,
};

export default withAlert(Studies);
