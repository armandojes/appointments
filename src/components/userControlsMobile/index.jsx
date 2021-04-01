/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, SwipeableDrawer } from '@material-ui/core';
import { ArrowRight, Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { singOut } from '../../core/models/auth';
import useSession from '../../session/useSession';
import styles from './styles.module.css';

const UserControlsMobile = () => {
  const session = useSession();
  const [isMenuOpen, setMenuState] = useState();

  const handleMenuOpen = () => setMenuState(true);
  const handleMenuClose = () => setMenuState(false);

  return (
    <>
      <Menu onClick={handleMenuOpen} />
      <SwipeableDrawer open={isMenuOpen} onOpen={handleMenuOpen} onClose={handleMenuClose} anchor="right">
        <div className={styles.wrapper} onClick={handleMenuClose}>
          <Box display="flex" justifyContent="center" alignItems="center" className={styles.headerClose}>
            Cerrar menu
            <ArrowRight className={styles.iconCloseMenu} />
          </Box>
          {session.type === 'employment' && (
            <Link className={styles.menuItem} to="/dashboard/appointments">Citas</Link>
          )}
          {session.type === 'companyManager' && (
            <Link className={styles.menuItem} to="/dashboard/appointments">Mi historial</Link>
          )}
          {session.type === 'admin' && (
            <>
              <Link className={styles.menuItem} to="/dashboard/branches">Sucursales</Link>
              <Link className={styles.menuItem} to="/dashboard/companies">Empresas</Link>
              <Link className={styles.menuItem} to="/dashboard/studies">Estudios</Link>
              <Link className={styles.menuItem} to="/dashboard/appointments">Citas</Link>
            </>
          )}
          <div className={styles.menuItem} onClick={singOut}>
            Cerrar sesión
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default UserControlsMobile;
