import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getSingleAppointment, updateAppointmentStatus } from 'src/core/models/appointments';
import { getCompanyWithUser } from 'src/core/models/companies';
import useFetch from 'src/hooks/useFetch';
import { stringDateToDate, toStringDate } from '../../../../helpers/dates';
import View from './view';

const AppointmentDetail = () => {
  const params = useParams();
  const history = useHistory();
  const [appointment, setAppointment] = useState({});
  const [companyWithOwner, setCompanyWithOwner] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    try {
      setLoading(true);
      const appointmentData = await getSingleAppointment(params.appointmentId);
      const companyData = await getCompanyWithUser(appointmentData.company.id);
      setAppointment(appointmentData);
      setCompanyWithOwner(companyData);
      setLoading(false);
    } catch (error) {
      history.goBack();
    }
  };

  const handleStatusChange = async (val) => {
    await updateAppointmentStatus(params.appointmentId, val);
    handleFetch();
  };

  useFetch(handleFetch);

  const handleIsOutDateCompute = () => {
    if (appointment.stringDate) {
      const appointmentDate = stringDateToDate(appointment.stringDate);
      const currentDate = stringDateToDate(toStringDate(new Date()));
      return currentDate > appointmentDate;
    }
    return false;
  };

  const computedStatus = (appointment.status && appointment.status === 'pending' && handleIsOutDateCompute())
    ? 'outdate'
    : appointment.status;

  return (
    <View
      loading={loading}
      appointment={appointment}
      company={companyWithOwner.company || {}}
      companyOwner={companyWithOwner}
      studies={appointment.studies || []}
      profiles={appointment.profiles || []}
      customStudy={appointment.otherStudy || null}
      isOutdate={handleIsOutDateCompute()}
      status={computedStatus}
      onStatusChange={handleStatusChange}
    />
  );
};

export default AppointmentDetail;
