/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconSrc from 'src/assets/icono_confirmacion.png';
import Empty from '../../components/empty';
import Loading from '../../components/loading';
import Container from '../../components/main/Container';
import { appointmentStatus, appointmentStatusColors } from '../../constants';
import { getCompanyAppointmentsHistory } from '../../core/models/appointments';
import { stringDateToDate, toStringDate } from '../../helpers/dates';
import limitText from '../../helpers/limitText';
import withAuth from '../../highOrderComponents/withAuth';
import useFetch from '../../hooks/useFetch';
import useSession from '../../session/useSession';
import Header from '../createAppointment/components/header';
import styles from './styles.module.css';

const StudyHistory = () => {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useFetch(async () => {
    const itemsFetched = await getCompanyAppointmentsHistory(session.id);
    setItems(itemsFetched);
    setLoading(false);
  });

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
                    {limitText(item.studies.length ? item.studies[0].title : item.otherStudy, 25)}
                  </div>
                  <div className={styles.cellId}>{item.id}</div>
                  <div className={styles.cellStatus} style={{ color: appointmentStatusColors[handleComputeState(item)] === 'green' ? 'var(--blue)' : appointmentStatusColors[handleComputeState(item)] }}>{appointmentStatus[handleComputeState(item)]}</div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default withAuth(StudyHistory, { companyManager: true });
