import React, { useState } from 'react';
import useFetch from 'src/hooks/useFetch';
import companies, { getApproveds } from 'src/core/models/companies';
import { func } from 'prop-types';
import withAlert from 'src/highOrderComponents/withAlert';
import { useHistory } from 'react-router';
import View from './view';
import useNotification from '../../../../../../notifications/useSession';

const CompaniesApproved = ({ setAlert }) => {
  const setNotification = useNotification();
  const [state, setState] = useState({ loading: true, items: [] });
  const history = useHistory();

  const handleCreate = () => {
    history.push('/dashboard/company-editor');
  };

  const handleUpdate = ({ id }) => {
    history.push(`/dashboard/company-editor/${id}`);
  };

  const handleFetch = async () => {
    const items = await getApproveds();
    setState({ items, loading: false });
  };

  useFetch(handleFetch);

  const handleDeleteWithAlert = (id) => {
    setAlert({
      title: 'Eliminar empresa',
      message: 'Tambien eliminará toda la información de las citas de esta empresa',
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
    <>
      <View
        onEdit={handleUpdate}
        loading={state.loading}
        items={state.items}
        onDelete={handleDeleteWithAlert}
        onCreate={handleCreate}
      />
    </>
  );
};

CompaniesApproved.propTypes = {
  setAlert: func.isRequired,
};

export default withAlert(CompaniesApproved);
