/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { deleteRequestCompany, getRequests } from 'src/core/models/companies';
import useFetch from 'src/hooks/useFetch';
import withAlert from 'src/highOrderComponents/withAlert';
import { func } from 'prop-types';
import View from './view';
import AprovingCompanyModal from './components/aprovingModal';
import useNotification from '../../../../../../notifications/useSession';

const Requests = ({ setAlert }) => {
  const setNotification = useNotification();
  const [state, setState] = useState({ loading: true, items: [] });
  const [currentCompanyAproving, setCompanyAproving] = useState(null);

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

  const handleApprov = (companyData) => setCompanyAproving(companyData);
  const handleCloseCurrentCompanyAproving = () => setCompanyAproving(null);

  return (
    <>
      <AprovingCompanyModal
        open={!!currentCompanyAproving}
        data={currentCompanyAproving || {}}
        onClose={handleCloseCurrentCompanyAproving}
        onSuccess={handleFetch}
      />
      <View
        loading={state.loading}
        items={state.items}
        onDelete={handleDeleteWithAlert}
        onAprov={handleApprov}
      />
    </>
  );
};

Requests.propTypes = {
  setAlert: func.isRequired,
};

export default withAlert(Requests);
