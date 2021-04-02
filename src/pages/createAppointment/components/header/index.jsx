import { Box, Hidden } from '@material-ui/core';
import { number, string } from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

const Header = ({ step, title, icon, companyName, companyManager }) => (
  <div className={styles.wrapper}>

    <div className={styles.left}>
      <img src={icon} alt="icono de registro de pacientes" className={styles.icon} />
      <div>
        <div className={styles.step}>
          Paso {step}
        </div>
        <div className={styles.title}>
          {title}
        </div>
      </div>
    </div>

    {!!companyName && !!companyManager && (
      <div className={styles.companyWrapper}>
        <div className={styles.companyText}>Empresa<Hidden smUp>:</Hidden></div>
        <div className={styles.companyName}>{companyName}</div>
        <Box paddingTop=".7em" />
        <div className={styles.companyManagerName}>{companyManager}</div>
        <div className={styles.companyManagerText}>Representante</div>
      </div>
    )}

  </div>
);

Header.defaultProps = {
  step: null,
  title: null,
  icon: null,
  companyName: null,
  companyManager: null,
};

Header.propTypes = {
  step: number,
  title: string,
  icon: string,
  companyName: string,
  companyManager: string,
};

export default Header;
