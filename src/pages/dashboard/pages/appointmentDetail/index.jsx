import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getSingleAppointment } from 'src/core/models/appointments';
import { getCompanyWithUser } from 'src/core/models/companies';
import useFetch from 'src/hooks/useFetch';
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

  useFetch(handleFetch);

  return (
    <View
      loading={loading}
      appointment={appointment}
      company={companyWithOwner.company || {}}
      companyOwner={companyWithOwner}
      studies={appointment.studies || []}
      customStudy={appointment.otherStudy || null}
    />
  );
};

export default AppointmentDetail;
