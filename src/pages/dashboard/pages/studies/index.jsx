/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { func } from 'prop-types';
import React, { useState } from 'react';
import { getStudies } from '../../../../core/models/studies';
import withAlert from '../../../../highOrderComponents/withAlert';
import useFetch from '../../../../hooks/useFetch';
import View from './view';

const Studies = ({ setAlert }) => {
  const [studies, setStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      message: 'Una vez ejecutada la acción no se podrá recuperar la información',
      action: async () => {},
    });
  };

  return (
    <View
      items={studies}
      isLoading={isLoading}
      onDeleteItem={handleDeleteItemWithAlert}
    />
  );
};

Studies.propTypes = {
  setAlert: func.isRequired,
};

export default withAlert(Studies);
