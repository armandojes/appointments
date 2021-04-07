/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { Box, Grid, Hidden } from '@material-ui/core';
import { Phone, WhatsApp } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import confirmIconSrc from 'src/assets/icono_confirmacion.png';
import Loading from '../../components/loading';
import Button from '../../components/main/button';
import Container from '../../components/main/Container';
import Text from '../../components/main/text';
import { colors, payoutTypes } from '../../constants';
import { getSingleAppointment } from '../../core/models/appointments';
import branches from '../../core/models/branches';
import { getCompanyWithUser } from '../../core/models/companies';
import useFetch from '../../hooks/useFetch';
import Header from '../createAppointment/components/header';
import styles from './styles.module.css';

const AppointmentSummary = () => {
  const params = useParams();
  const history = useHistory();
  const [appointment, setAppointment] = useState({});
  const [companyWithOwner, setCompanyWithOwner] = useState({});
  const [branchData, setBranchData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    try {
      setLoading(true);
      const appointmentData = await getSingleAppointment(params.appointmentId);
      const companyData = await getCompanyWithUser(appointmentData.company.id);
      const branchDataFetched = await branches.getSingle(appointmentData.branch);
      setAppointment(appointmentData);
      setCompanyWithOwner(companyData);
      setBranchData(branchDataFetched);
      setLoading(false);
    } catch (error) {
      history.goBack();
    }
  };

  useFetch(handleFetch);

  return (
    <Container>
      {loading && <Loading />}
      {!loading && (
        <>
          <Hidden xsDown>
            <Header
              title="¡Cita agendada!"
              icon={confirmIconSrc}
              companyName={companyWithOwner.company.name}
              companyManager={companyWithOwner.name}
            />
          </Hidden>

          <Hidden smUp>
            <Box marginTop="-2em" marginBottom="2em">
              <Header
                title="¡Cita agendada!"
                icon={confirmIconSrc}
              />
            </Box>
          </Hidden>

          <div className={styles.appointmentIdWrapper}>
            <div className={styles.code}>CÓDIGO </div>
            <div className={styles.value}>{appointment.id}</div>
          </div>

          <div className={styles.bodyLimiter}>
            <div className={styles.centerOnlyMobile}>
              <Box marginBottom="2em">
                <Text fontWeight="900" color={colors.blue} fontSize="1.3em">{appointment.patientName}</Text>
                <Text color={colors.green} fontSize="1.1em">Paciente</Text>
              </Box>
            </div>

            <div className={styles.studyListWrapper}>
              {appointment.studies.map((study) => (
                <div className={styles.studyWrapper} id={study.id}>
                  <Box flexGrow="1">
                    <div className={styles.centerOnlyMobile}>
                      <Text fontWeight="900" color={colors.blue} fontSize="1.3em">{study.title}</Text>
                      <Text color={colors.green} fontSize="1.1em">Estudio</Text>
                    </div>
                  </Box>
                </div>
              ))}
            </div>

            <div className={styles.centerOnlyMobile}>
              <Box marginBottom="2em">
                <Text fontWeight="900" color={colors.green} fontSize="1.3em">15 de Marzo 2021</Text>
                <Text fontWeight="900" color={colors.green} fontSize="1.3em">9:30 AM</Text>
              </Box>
            </div>

            <div className={styles.centerOnlyMobile}>
              <Box marginBottom="2em">
                <Text fontWeight="900" color={colors.blue} fontSize="1.3em">
                  Sucursal: <span style={{ color: colors.green }}>{branchData.name}</span>
                </Text>
                <Text color={colors.blue} fontSize="1.1em">{branchData.address}</Text>
              </Box>
            </div>

            <div className={styles.centerOnlyMobile}>
              <Box marginBottom="2em">
                <Text fontWeight="900" color={colors.blue} fontSize="1.3em">
                  {payoutTypes[appointment.payoutType] || appointment.payoutType}
                </Text>
                {appointment.payoutType === 'branch' && <Text color={colors.blue} fontSize="1.1em">Paga su estudio en efectivo</Text>}
              </Box>
            </div>

            <Box marginBottom="2em">
              <Text fontWeight="900" color={colors.blue} fontSize="1.3em" className={styles.centerOnlyMobile}>
                INDICACIONES:
              </Text>
              {appointment.studies.map((study) => (
                <div className={`${styles.indicationsItem} ${styles.centerOnlyMobile}`} key={study.id}>
                  <Text color={colors.green} fontSize="1.3em" fontWeight="900">
                    {study.indications}
                  </Text>
                </div>
              ))}
            </Box>

            <div className={styles.fotterCard}>
              <div>SU CITA HA SIDO GENERADA EXITOSAMENTE.</div>
              <div>SE NOTIFICARÁ POR CORREO ELECTRÓNICO CON SU CÓDIGO DE CONFIRMACIÓN.</div>
              <div className={styles.green}>¡GRACIAS POR SU CONFIANZA!</div>
            </div>
            <Link to="/">
              <Button variant="contained" className={styles.button}>CERRAR</Button>
            </Link>
          </div>

          <Box marginTop="4em" marginBottom="2em">
            <Grid container justify="center" alignItems="center">
              <div className={styles.contactWrapper}>
                <Phone className={styles.contactIcon} />
                Tel. 442 213 0898
              </div>
              <Box marginRight="2em" />
              <div className={styles.contactWrapper}>
                <WhatsApp className={styles.contactIcon} />
                WhatsApp
              </div>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
};

export default AppointmentSummary;
