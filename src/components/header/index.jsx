import React from 'react';
import logoSrc from 'src/assets/logo.png';
import Container from '../main/Container';
import styles from './styles.module.css';

const Header = () => (
  <header className={styles.header}>
    <Container paddingTopDissabled>
      <div className={styles.headerBody}>
        <img src={logoSrc} alt="logo iml" className={styles.logo} />
        <div>
          <a href="https://www.laboratoriosiml.com/index.php" className={styles.link}>
            REGRESAR AL SITIO IML
          </a>
          <div className={styles.line} />
        </div>
      </div>
    </Container>
  </header>
);

export default Header;
