/* eslint-disable no-unused-vars */
import React from 'react';
import registerIconSrc from 'src/assets/icono_registro.png';
import { Box } from '@material-ui/core';
import { array, func, string } from 'prop-types';
import { Check } from '@material-ui/icons';
import styles from './styles.module.css';
import Input from '../../../../components/main/input';
import Header from '../header';
import ErrorMessage from '../../../../components/errorMessage';

const RegisterPatient = ({ studies, onStudyClick, getInputProps, errorMessage }) => (
  <>
    <Box padding="2em 0em">
      <Header
        step={1}
        title="Registro de paciente"
        icon={registerIconSrc}
        companyName="Asics Space"
        companyManager="Armando de jesus santiz lopez"
      />
      <div className={styles.body}>
        <ErrorMessage message={errorMessage} marginBottom="1em" />
        <Input className={styles.inputText} {...getInputProps('patientName')} variant="underline" placeholder="Nombre del paciente" />
        <Input className={styles.inputText} {...getInputProps('patientBirthDate')} variant="underline" placeholder="Fecha de nacimiento DD/MM/AAAA (opcional)" />
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
};

export default RegisterPatient;
