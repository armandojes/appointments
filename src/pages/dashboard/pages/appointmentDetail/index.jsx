import { func } from 'prop-types';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getSingleAppointment, updateAppointmentStatus, deleteAppointment } from 'src/core/models/appointments';
import { getCompanyWithUser } from 'src/core/models/companies';
import useFetch from 'src/hooks/useFetch';
import { stringDateToDate, toStringDate } from '../../../../helpers/dates';
import withAlert from '../../../../highOrderComponents/withAlert';
import useNotification from '../../../../notifications/useSession';
import View from './view';

const AppointmentDetail = ({ setAlert }) => {
  const setNotification = useNotification();
  const { appointmentId } = useParams();
  const history = useHistory();
  const [appointment, setAppointment] = useState({});
  const [companyWithOwner, setCompanyWithOwner] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    try {
      setLoading(true);
      const appointmentData = await getSingleAppointment(appointmentId);
      const companyData = await getCompanyWithUser(appointmentData.company.id);
      setAppointment(appointmentData);
      setCompanyWithOwner(companyData);
      setLoading(false);
    } catch (error) {
      history.goBack();
    }
  };

  const handleStatusChange = async (val) => {
    await updateAppointmentStatus(appointmentId, val);
    handleFetch();
  };

  const handleDelete = async () => {
    setAlert({
      title: '¿Seguro quieres eliminar esta cita?',
      action: async () => {
        const response = await deleteAppointment(appointmentId);
        if (response.status === 'success') {
          setNotification({ type: 'success', message: 'Cita eliminada correctamente' });
          history.goBack();
        } else {
          setNotification({ type: 'error', message: response.errorMessage });
        }
      },
    });
  };

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

  useFetch(handleFetch);

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
      onDelete={handleDelete}
    />
  );
};

AppointmentDetail.propTypes = {
  setAlert: func.isRequired,
};

export default withAlert(AppointmentDetail);
