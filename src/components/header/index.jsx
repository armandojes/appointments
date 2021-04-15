/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Box, Hidden } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logoSrc from 'src/assets/logo.png';
import useSession from '../../session/useSession';
import Container from '../main/Container';
import UserControls from '../userControls';
import UserControlsMobile from '../userControlsMobile';
import styles from './styles.module.css';

const Header = () => {
  const session = useSession();
  const history = useHistory();

  const handleRedirectToHome = () => history.push('/');

  return (
    <header className={styles.header}>
      <Container paddingTopDissabled>
        <div className={styles.headerBody}>

          <img src={logoSrc} alt="logo iml" className={styles.logo} onClick={handleRedirectToHome} />

          <div className={styles.right}>
            <Hidden xsDown>
              <div>
                <a href="https://www.laboratoriosiml.com/index.php" className={styles.link}>
                  REGRESAR AL SITIO IML
                </a>
                <div className={styles.line} />
              </div>

              {!!session && (
                <>
                  <Box marginLeft="2em">
                    <UserControls />
                  </Box>
                </>
              )}
            </Hidden>
            {session && (
              <Hidden smUp>
                <UserControlsMobile />
              </Hidden>
            )}
          </div>

        </div>
      </Container>
    </header>
  );
};

export default Header;
