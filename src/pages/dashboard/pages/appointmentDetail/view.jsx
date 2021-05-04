/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import studyIconSrc from 'src/assets/lab.png';
import { array, bool, func, object, string } from 'prop-types';
import { Delete, Edit } from '@material-ui/icons';
import { Box, Grid, Menu } from '@material-ui/core';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import { appointmentStatus, appointmentStatusColors, colors, payoutTypes } from 'src/constants';
import Loading from 'src/components/loading';
import { toStringDate } from 'src/helpers/dates';
import styles from './styles.module.css';
import Caption from '../../../../components/caption';

const View = ({ loading, company, appointment, companyOwner, studies, customStudy, status, onStatusChange, isOutdate, profiles, onDelete }) => {
  const [anchorSelect, setAchorSelect] = useState(null);

  const handleClose = () => setAchorSelect(null);
  const handleOpen = (e) => setAchorSelect(e.currentTarget);

  let studiesNumber = studies.length;
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

              <Box marginBottom="1em">
                <Grid container alignItems="center">
                  <div style={{ borderColor: colorStatus, color: colorStatus }} className={styles.status} onClick={handleOpen} role="button">
                    Estado: {appointmentStatus[status] || status}
                    <Edit />
                  </div>
                  <Caption message="Eliminar" className={styles.caption}>
                    <Delete className={styles.delete} onClick={onDelete} />
                  </Caption>
                </Grid>
              </Box>

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
                <span>id:</span> {company.customId || companyOwner.id}
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
            <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">Estudios {studiesNumber} </Text>
            <div className={styles.cardBody}>
              <div className={styles.StidoesListWrapper}>

                {studies.map((study) => (
                  <div className={styles.studyItemWrapper}>
                    <div className={styles.studyCard}>
                      <img src={studyIconSrc} alt="icono de laboratorio" className={styles.studyIcon} />
                      <div className={styles.itemDataWrapper}>
                        <div className={styles.row}>
                          <div>{study.title}</div>
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
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </Card>

          {!!profiles.length && (
            <Card className={styles.card}>
              <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">Perfiles {profiles.length} </Text>
              <div className={styles.cardBody}>
                <div className={styles.StidoesListWrapper}>

                  {profiles.map((profile) => (
                    <div className={styles.studyItemWrapper}>
                      <div className={styles.studyCard}>
                        <img src={studyIconSrc} alt="icono de laboratorio" className={styles.studyIcon} />
                        <div className={styles.itemDataWrapper}>
                          <div className={styles.row}>
                            <div>{profile.title}</div>
                            {profile.studiesWithData && profile.studiesWithData.map((std) => (
                              <Text fontWeight="normal" lineHeight="1.3em"> - {std.title}</Text>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

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
  profiles: array.isRequired,
  onDelete: func.isRequired,
};

export default View;
