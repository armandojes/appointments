import React from 'react';
import registerIconSrc from 'src/assets/icono_registro.png';
import { Box, Grid, Hidden } from '@material-ui/core';
import { array, func, string } from 'prop-types';
import { Check } from '@material-ui/icons';
import styles from './styles.module.css';
import Input from '../../../../components/main/input';
import Header from '../header';
import ErrorMessage from '../../../../components/errorMessage';

const RegisterPatient = ({ onPatientBirthDateBlur, profiles, studies, onStudyClick, getInputProps, errorMessage, companyManager, companyName, onProfileClick }) => (
  <>
    <Box padding="2em 0em">
      <Header
        step={1}
        title="Registro de paciente"
        icon={registerIconSrc}
        companyName={companyName}
        companyManager={companyManager}
      />
      <div className={styles.body}>
        <ErrorMessage message={errorMessage} marginBottom="1em" />

        <Hidden xsDown>
          <Grid container wrap="nowrap">
            <Input className={styles.inputText} {...getInputProps('patientPlastName')} variant="underline" placeholder="Apellido paterno" />
            <Box paddingRight="1em" />
            <Input className={styles.inputText} {...getInputProps('patientMlastName')} variant="underline" placeholder="Apellido materno" />
            <Box paddingRight="1em" />
            <Input className={styles.inputText} {...getInputProps('patientName')} variant="underline" placeholder="Nombre(s)" />
          </Grid>
        </Hidden>

        <Hidden smUp>
          <div>
            <Input className={styles.inputText} {...getInputProps('patientPlastName')} variant="underline" placeholder="Apellido paterno" />
            <Box paddingRight="1em" />
            <Input className={styles.inputText} {...getInputProps('patientMlastName')} variant="underline" placeholder="Apellido materno" />
            <Box paddingRight="1em" />
            <Input className={styles.inputText} {...getInputProps('patientName')} variant="underline" placeholder="Nombre(s)" />
          </div>
        </Hidden>
        <Input className={styles.inputText} {...getInputProps('patientBirthDate')} variant="underline" placeholder="Fecha de nacimiento DD/MM/AAAA (opcional)" onBlur={onPatientBirthDateBlur} />
        <div className={styles.textBold}>Estudios a realizarse*:</div>

        <div className={styles.studyWrapper}>
          {studies.map((currentStudy) => (
            <div className={styles.itemWrapper} key={currentStudy.id}>
              <div role="button" className={styles.item} id={currentStudy.id} onClick={onStudyClick} name={currentStudy.id}>
                <div className={`${styles.checkbox} ${currentStudy.isSelected ? styles.checkboxSelected : ''}`}>
                  {currentStudy.isSelected && <Check />}
                </div>
                <div className={`${styles.itemTitle} ${currentStudy.isSelected ? styles.itemTitleSlected : ''}`}>{currentStudy.title}</div>
              </div>
            </div>
          ))}
          {profiles.map((currentProfile) => (
            <div className={styles.itemWrapper} key={currentProfile.id}>
              <div role="button" className={styles.item} id={currentProfile.id} onClick={onProfileClick} name={currentProfile.id}>
                <div className={`${styles.checkbox} ${currentProfile.isSelected ? styles.checkboxSelected : ''}`}>
                  {currentProfile.isSelected && <Check />}
                </div>
                <div className={`${styles.itemTitle} ${currentProfile.isSelected ? styles.itemTitleSlected : ''}`}>
                  {currentProfile.title}
                </div>
              </div>
              <div className={`${styles.itemsInsideProfileWrapper} ${currentProfile.isSelected ? styles.itemTitleSlected : ''}`}>
                {currentProfile.studiesWithData.map((std) => (
                  <div> - {std.title} </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Input className={styles.inputText} {...getInputProps('otherStudy')} variant="underline" placeholder="Otro especificar" />
      </div>
    </Box>
  </>
);

RegisterPatient.propTypes = {
  studies: array.isRequired,
  onStudyClick: func.isRequired,
  getInputProps: func.isRequired,
  errorMessage: string.isRequired,
  companyManager: string.isRequired,
  companyName: string.isRequired,
  profiles: array.isRequired,
  onProfileClick: func.isRequired,
  onPatientBirthDateBlur: func.isRequired,
};

export default RegisterPatient;
