/* eslint-disable no-unused-vars */
import { func } from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import profilesModel from 'src/core/models/profiles';
import withAlert from 'src/highOrderComponents/withAlert';
import useFetch from 'src/hooks/useFetch';
import useNotification from '../../../../notifications/useSession';
import View from './view';

const Profiles = ({ setAlert }) => {
  const setNotification = useNotification();
  const [studies, setStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState('');
  const history = useHistory();

  let studiesFiletered = studies;
  if (keywords && keywords.toString().length) {
    studiesFiletered = studiesFiletered.filter((study) => study.title.toLowerCase().includes(keywords.toString().toLowerCase()));
  }

  const handleKeywordChange = (e) => setKeywords(e.target.value);

  const handleFetch = async () => {
    setIsLoading(true);
    const stidiesList = await profilesModel.getList();
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
      title: '¿Seguro quiere eliminar este perfil?',
      message: 'Una vez ejecutada la acción no podrás recuperar la información',
      action: async () => {
        const response = await profilesModel.remove(id);
        await handleFetch();
        if (response.status === 'success') setNotification({ status: 'success', message: 'Perfil eliminado correctamente' });
        else setNotification({ status: 'error', message: response.errorMessage });
      },
    });
  };

  const handleEditItem = ({ id }) => {
    history.push(`/dashboard/profiles/editor/${id}`);
  };

  return (
    <View
      items={studiesFiletered}
      isLoading={isLoading}
      onDeleteItem={handleDeleteItemWithAlert}
      onEditItem={handleEditItem}
      keywords={keywords}
      onKeywordChange={handleKeywordChange}
    />
  );
};

Profiles.propTypes = {
  setAlert: func.isRequired,
};

export default withAlert(Profiles);
