import React, { useState } from 'react';
import { getAllAppointments } from 'src/core/models/appointments';
import useFetch from 'src/hooks/useFetch';
import branches from '../../../../core/models/branches';
import useSession from '../../../../session/useSession';
import View from './view';

const Appointments = () => {
  const session = useSession();
  const [state, setState] = useState({
    branchesList: [],
    isLoading: true,
    appointments: [],
    keywords: '',
    filterCompany: null,
    keyWords: '',
    branchId: session.branchId,
  });

  let appointmentsFiltered = state.appointments;

  // filter by company
  if (state.filterCompany) {
    appointmentsFiltered = appointmentsFiltered.filter((item) => item.company.id === state.filterCompany);
  }

  // filter by keywords
  if (state.keyWords) {
    appointmentsFiltered = appointmentsFiltered.filter((item) => {
      if (item.patientName.toLowerCase().includes(state.keyWords.toLowerCase())) return true;
      if (item.id.toLowerCase().includes(state.keyWords.toLowerCase())) return true;
      return false;
    });
  }

  // filter branchid
  if (state.branchId) {
    appointmentsFiltered = appointmentsFiltered.filter((item) => item.branch === state.branchId);
  }

  const setComposeState = (newState) => {
    setState((prevStates) => ({ ...prevStates, ...newState }));
  };

  // make company options
  const makeCompanyOptions = () => state.appointments.reduce((acum, current) => {
    if (acum.some((a) => a.id === current.company.id)) return acum;
    return [...acum, current.company];
  }, []);

  // fetch initial data
  useFetch(async () => {
    const items = await getAllAppointments();
    const branchesFetched = await branches.list();
    setComposeState({
      appointments: items,
      isLoading: false,
      branchesList: branchesFetched,
    });
  });

  const handleCompanyChange = (val) => {
    setComposeState({ filterCompany: val, keyWords: '', branchId: null });
  };

  const handleKeyWordChange = (e) => {
    setComposeState({ filterCompany: null, keyWords: e.target.value, branchId: null });
  };

  const handleBranchChange = (branchId) => {
    setComposeState({ branchId, keyWords: '', filterCompany: null });
  };

  return (
    <View
      isLoading={state.isLoading}
      items={appointmentsFiltered}
      companyOptions={makeCompanyOptions()}
      onCompanyChange={handleCompanyChange}
      onChangeKeywords={handleKeyWordChange}
      keyWords={state.keyWords}
      onBranchChange={handleBranchChange}
      branchOptions={state.branchesList}
    />
  );
};

export default Appointments;
