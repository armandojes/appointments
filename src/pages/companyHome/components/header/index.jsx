import React from 'react';
import caldendarIconSrc from 'src/assets/icono_calendario.png';
import styles from './styles.module.css';

const Header = () => (
  <div className={styles.wrapper}>
    <img src={caldendarIconSrc} alt="icono calendario" className={styles.icon} />
    <h1 className={styles.title}>Agenda para Empresas</h1>
  </div>
);

export default Header;
