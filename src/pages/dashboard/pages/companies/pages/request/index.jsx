import React, { useState } from 'react';
import { deleteRequestCompany, getRequests } from 'src/core/models/companies';
import useFetch from 'src/hooks/useFetch';
import withAlert from 'src/highOrderComponents/withAlert';
import { func } from 'prop-types';
import View from './view';
import withNotifications from '../../../../../../highOrderComponents/withNotification';

const Requests = ({ setAlert, setNotification }) => {
  const [state, setState] = useState({ loading: true, items: [] });

  const handleFetch = async () => {
    const list = await getRequests();
    setState({ loading: false, items: list });
  };

  useFetch(handleFetch);

  const handleDeleteWithAlert = (companyId) => {
    setAlert({
      title: '¿Seguro quieres eliminar esta empresa?',
      message: 'No podrá repuerar la información una vez eliminada',
      action: async () => {
        const { status } = await deleteRequestCompany(companyId);
        if (status === 'success') {
          await handleFetch();
          setNotification({ status: 'success', message: 'Solicitud de empresa eliminado correctamente' });
        } else setNotification({ status: 'error', message: 'Error el aliminar' });
      },
    });
  };

  return (
    <View
      loading={state.loading}
      items={state.items}
      onDelete={handleDeleteWithAlert}
    />
  );
};

Requests.propTypes = {
  setAlert: func.isRequired,
  setNotification: func.isRequired,
};

export default withNotifications(withAlert(Requests));
