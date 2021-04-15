import React, { useState } from 'react';
import studyIconSrc from 'src/assets/lab.png';
import { array, bool, func, object, string } from 'prop-types';
import { Edit } from '@material-ui/icons';
import { Menu } from '@material-ui/core';
import Card from '../../../../components/card';
import Text from '../../../../components/main/text';
import { appointmentStatus, appointmentStatusColors, colors, payoutTypes } from '../../../../constants';
import styles from './styles.module.css';
import Loading from '../../../../components/loading';
import { toStringDate } from '../../../../helpers/dates';

const View = ({ loading, company, appointment, companyOwner, studies, customStudy, status, onStatusChange, isOutdate }) => {
  const [anchorSelect, setAchorSelect] = useState(null);

  const handleClose = () => setAchorSelect(null);
  const handleOpen = (e) => setAchorSelect(e.currentTarget);

  let studiesNumber = studies.length;
  const tolaPrice = studies.reduce((acc, current) => acc + current.price, 0);
  if (customStudy) studiesNumber += 1;

  const colorStatus = appointmentStatusColors[status];

  return (
    <>
      {!!loading && <Loading />}
      {!loading && (
        <div className={styles.wrapperLimiter}>
          <Menu
            open={!!anchorSelect}
            anchorEl={anchorSelect}
            anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
            onClose={handleClose}
            BackdropProps={{ className: styles.backdropSelectOpen }}
            onClick={handleClose}
            className={styles.menu}
          >
            <div onClick={() => onStatusChange('complete')} role="button" className={styles.option}>Completado</div>
            <div onClick={() => onStatusChange('pending')} role="button" className={styles.option}>{isOutdate ? 'Vencido' : 'Pendiente'}</div>
          </Menu>
          <Card className={styles.card}>
            <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">Detalles de cita</Text>
            <div className={styles.cardBody}>
              <div className={styles.row}>
                <div style={{ borderColor: colorStatus, color: colorStatus }} className={styles.status} onClick={handleOpen} role="button">
                  Estado: {appointmentStatus[status] || status}
                  <Edit />
                </div>
              </div>
              <div className={styles.row}>
                <span className={styles.describe}>Paciente:</span> {appointment.patientName}
              </div>
              {appointment.patientBirthDate && (
                <div className={styles.row}>
                  <span className={styles.describe}>Fecha de nacimiento:</span> {appointment.patientBirthDate}
                </div>
              )}
              <div className={styles.row}>
                <span className={styles.describe}>Fecha de cita:</span> {appointment.stringDate}
              </div>
              <div className={styles.row}>
                <span>Hora de cita:</span> {appointment.stringTime}
              </div>
              <div className={styles.row}>
                <span>Fecha de registro:</span> {toStringDate(appointment.createdAt)}
              </div>
              <div className={styles.row}>
                <span>Método de pago</span> {payoutTypes[appointment.payoutType] || appointment.payoutType}
              </div>
              {appointment.payoutComments && (
                <div className={styles.row}>
                  <span>Comentario:</span> {appointment.payoutComments}
                </div>
              )}
              <div className={styles.row}>
                <span>id:</span> {appointment.id}
              </div>
            </div>
          </Card>

          <Card className={styles.card}>
            <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">Empresa</Text>
            <div className={styles.cardBody}>
              <div className={styles.row}>
                <span className={styles.describe}>Nombre:</span> {company.name}
              </div>
              <div className={styles.row}>
                <span className={styles.describe}>Correo:</span> {company.email}
              </div>
              <div className={styles.row}>
                <span className={styles.describe}>Teléfono:</span> {company.phone}
              </div>
              <div className={styles.row}>
                <span className={styles.describe}>Razón Social:</span> {company.razonSocial}
              </div>
              <div className={styles.row}>
                <span className={styles.describe}>RFC:</span> {company.rfc}
              </div>
              <div className={styles.row}>
                <span>Dirección:</span> {company.address}
              </div>
              <div className={styles.row}>
                <span>id:</span> {companyOwner.id}
              </div>
            </div>
          </Card>

          <Card className={styles.card}>
            <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">Encargado de la empresa</Text>
            <div className={styles.cardBody}>
              <div className={styles.row}>
                <span className={styles.describe}>Nombre:</span> {companyOwner.fullName || companyOwner.name}
              </div>
              <div className={styles.row}>
                <span className={styles.describe}>Correo:</span> {companyOwner.email}
              </div>
            </div>
          </Card>

          <Card className={styles.card}>
            <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">Estudios {studiesNumber} (total ${tolaPrice}.00)</Text>
            <div className={styles.cardBody}>
              <div className={styles.StidoesListWrapper}>

                {studies.map((study) => (
                  <div className={styles.studyItemWrapper}>
                    <div className={styles.studyCard}>
                      <img src={studyIconSrc} alt="icono de laboratorio" className={styles.studyIcon} />
                      <div className={styles.itemDataWrapper}>
                        <div className={styles.row}>
                          <div>{study.title}</div>
                          <div><span>$ {study.price}.00 MXN</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {!!customStudy && (
                  <div className={styles.studyItemWrapper}>
                    <div className={styles.studyCard}>
                      <img src={studyIconSrc} alt="icono de laboratorio" className={styles.studyIcon} />
                      <div className={styles.itemDataWrapper}>
                        <div className={styles.row}>
                          <div className={styles.otherText}>Personalizado</div>
                          <div>{customStudy}</div>
                          <div><span>$ 0.00 MXN</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </Card>

        </div>
      )}
    </>
  );
};

View.defaultProps = {
  customStudy: null,
};

View.propTypes = {
  loading: bool.isRequired,
  appointment: object.isRequired,
  company: object.isRequired,
  companyOwner: object.isRequired,
  studies: array.isRequired,
  customStudy: string,
  status: string.isRequired,
  onStatusChange: func.isRequired,
  isOutdate: bool.isRequired,
};

export default View;
