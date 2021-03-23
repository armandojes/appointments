import React, { useState } from 'react';
import useFetch from 'src/hooks/useFetch';
import companies, { getApproveds } from 'src/core/models/companies';
import { func } from 'prop-types';
import withAlert from 'src/highOrderComponents/withAlert';
import withNotifications from 'src/highOrderComponents/withNotification';
import View from './view';

const CompaniesApproved = ({ setAlert, setNotification }) => {
  const [state, setState] = useState({ loading: true, items: [] });

  const handleFetch = async () => {
    const items = await getApproveds();
    setState({ items, loading: false });
  };

  useFetch(handleFetch);

  const handleDeleteWithAlert = (id) => {
    setAlert({
      title: 'Eliminar empresa',
      message: 'Una vez ejecutada la acción no podras recuperar la información',
      action: async () => {
        const response = await companies.deleteAproved(id);
        if (response.status === 'success') {
          await handleFetch();
          setNotification({ type: 'success', message: 'Empresa eliminada correctamente' });
        } else {
          setNotification({ type: 'error', message: response.errorMessage });
        }
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

CompaniesApproved.propTypes = {
  setNotification: func.isRequired,
  setAlert: func.isRequired,
};

export default withNotifications(withAlert(CompaniesApproved));
