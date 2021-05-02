/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { Delete } from '@material-ui/icons';
import { func } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconSrc from 'src/assets/icono_confirmacion.png';
import Empty from '../../components/empty';
import Loading from '../../components/loading';
import Container from '../../components/main/Container';
import { appointmentStatus, appointmentStatusColors } from '../../constants';
import { getCompanyAppointmentsHistory, deleteAppointment } from '../../core/models/appointments';
import { stringDateToDate, toStringDate } from '../../helpers/dates';
import limitText from '../../helpers/limitText';
import withAlert from '../../highOrderComponents/withAlert';
import withAuth from '../../highOrderComponents/withAuth';
import useFetch from '../../hooks/useFetch';
import useNotification from '../../notifications/useSession';
import useSession from '../../session/useSession';
import Header from '../createAppointment/components/header';
import styles from './styles.module.css';

const StudyHistory = ({ setAlert }) => {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const setNotification = useNotification();

  const handleFetch = async () => {
    const itemsFetched = await getCompanyAppointmentsHistory(session.id);
    setItems(itemsFetched);
    setLoading(false);
  };

  useFetch(handleFetch);

  const handleIsOutDateCompute = (stringDate) => {
    if (stringDate) {
      const appointmentDate = stringDateToDate(stringDate);
      const currentDate = stringDateToDate(toStringDate(new Date()));
      return currentDate > appointmentDate;
    }
    return false;
  };

  const handleComputeState = (appointment) => {
    return (appointment.status && appointment.status === 'pending' && handleIsOutDateCompute(appointment.stringDate))
      ? 'outdate'
      : appointment.status;
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setAlert({
      title: '¿Seguro quieres eliminar esta cita?',
      message: 'Una vez eliminada no podras recuperar la información',
      action: async () => {
        const response = await deleteAppointment(id);
        if (response.status === 'success') {
          setNotification({ status: 'success', message: 'Cita eliminada correctamente' });
          await handleFetch();
        } else {
          setNotification({ type: 'error', message: response.errorMessage });
        }
      },
    });
  };

  return (
    <Container>
      {loading && <Loading />}
      {!loading && (
        <>
          <Header
            title="Historial de estudios"
            icon={iconSrc}
            companyManager={session.fullName || session.name}
            companyName={session.company.name}
          />
          {!items.length && (
            <Empty message="Aún no tienes estudios" />
          )}
          {!!items.length && (
            <div className={styles.itemListWrapper}>
              <div className={`${styles.row} ${styles.header}`}>
                <div className={styles.cellName}>Paciente</div>
                <div className={styles.cellStudy}>
                  Estudio
                </div>
                <div className={styles.cellId}>código</div>
                <div className={styles.cellStatus}>Estado</div>
              </div>
              {items.map((item) => (
                <Link className={styles.row} to={`/appointment/${item.id}`}>
                  <div className={styles.cellName}>
                    <div>
                      <div className={`${styles.onlyMobile} ${styles.onlyMobileDescribe}`}>Paciente:</div>
                      {limitText(item.patientName, 30)}
                    </div>
                    <div className={styles.onlyMobile}>
                      <div className={styles.onlyMobileDescribe}>Código</div>
                      <div>{item.id}</div>
                    </div>
                  </div>
                  <div className={styles.cellStudy}>
                    {limitText(item.studies.length ? item.studies[0].title : item.profiles.length ? item.profiles[0].title : item.otherStudy, 25)}
                  </div>
                  <div className={styles.cellId}>{item.id}</div>
                  <div
                    className={styles.cellStatus}
                    style={{ color: appointmentStatusColors[handleComputeState(item)] === 'green' ? 'var(--blue)' : appointmentStatusColors[handleComputeState(item)] }}
                  >
                    {appointmentStatus[handleComputeState(item)]}
                  </div>
                  <div onClick={(e) => handleDelete(item.id, e)} role="button">
                    <Delete />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

StudyHistory.propTypes = {
  setAlert: func.isRequired,
};

export default withAlert(withAuth(StudyHistory, { companyManager: true }));
