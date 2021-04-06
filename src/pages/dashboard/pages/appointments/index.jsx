/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { getAllAppointments } from 'src/core/models/appointments';
import useFetch from 'src/hooks/useFetch';
import branchesModel from 'src/core/models/branches';
import { useHistory, useParams } from 'react-router';
import View from './view';
import useSession from '../../../../session/useSession';

const Appointments = () => {
  const { branchId } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    appointmentName: '',
    isLoading: true,
    appointments: [],
    keywords: '',
    filterCompany: null,
    keyWords: '',
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

  const setComposeState = (newState) => {
    setState((prevStates) => ({ ...prevStates, ...newState }));
  };

  const makeCompanyOptions = () => {
    return state.appointments.reduce((acum, current) => {
      if (acum.some((a) => a.id === current.company.id)) return acum;
      return [...acum, current.company];
    }, []);
  };

  // fetch initial data
  useFetch(async () => {
    const items = await getAllAppointments(branchId);
    const branchData = await branchesModel.getSingle(branchId);
    if (!branchData) {
      history.push('/dashboard/select-branch');
    } else {
      setComposeState({
        appointments: items,
        isLoading: false,
        appointmentName: branchData.name,
      });
    }
  });

  const handleCompanyChange = (val) => {
    setComposeState({ filterCompany: val, keyWords: '' });
  };

  const handleKeyWordChange = (e) => {
    setComposeState({ filterCompany: null, keyWords: e.target.value });
  };

  return (
    <View
      isLoading={state.isLoading}
      items={appointmentsFiltered}
      companyOptions={makeCompanyOptions()}
      onCompanyChange={handleCompanyChange}
      onChangeKeywords={handleKeyWordChange}
      keyWords={state.keyWords}
    />
  );
};

export default Appointments;
