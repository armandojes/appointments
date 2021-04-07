/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Menu } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { singOut } from '../../core/models/auth';
import useSession from '../../session/useSession';
import styles from './styles.module.css';

const UserControls = () => {
  const session = useSession();
  const showName = session.fullName ? session.fullName.split(' ')[0] : session.name.split(' ')[0];
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <div className={styles.wrapper} onClick={handleMenuOpen}>
        {showName}
        <ArrowDropDown className={styles.icon} />
      </div>
      <Menu open={!!menuAnchorEl} anchorEl={menuAnchorEl} onClose={handleClose} onClick={handleClose} className={styles.menu}>
        <Box padding="1em">
          {session.type === 'employment' && (
            <Link to="/dashboard/appointments" className={styles.menuItem}>Citas</Link>
          )}
          {session.type === 'admin' && (
            <Link to="/dashboard" className={styles.menuItem}>dashboard</Link>
          )}
          {session.type === 'companyManager' && (
            <>
              <Link to="/create-appointment" className={styles.menuItem}>Nueva cita</Link>
              <Link to="/study-history" className={styles.menuItem}>Historial</Link>
            </>
          )}
          <div className={styles.menuItem} onClick={singOut}>Cerrar sesión</div>
        </Box>
      </Menu>
    </>
  );
};

export default UserControls;
