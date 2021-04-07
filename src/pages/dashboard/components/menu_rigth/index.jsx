import React from 'react';
import { NavLink } from 'react-router-dom';
import { singOut } from '../../../../core/models/auth';
import useSession from '../../../../session/useSession';
import styles from './styles.module.css';

const MenuRight = () => {
  const session = useSession();

  return (
    <div className={styles.menuWrapper}>
      {session.type === 'admin' && (
        <>
          <NavLink to="/dashboard/branches" className={styles.link} activeClassName={styles.linkSelected}>Sucursales </NavLink>
          <NavLink to="/dashboard/companies" className={styles.link} activeClassName={styles.linkSelected}>Empresas </NavLink>
          <NavLink to="/dashboard/employments" className={styles.link} activeClassName={styles.linkSelected}>Empleados </NavLink>
          <NavLink to="/dashboard/studies" className={styles.link} activeClassName={styles.linkSelected}>Estudios </NavLink>
        </>
      )}
      <NavLink to="/dashboard/appointments" className={styles.link} activeClassName={styles.linkSelected}>Citas</NavLink>
      <div
        to="/dashboard/appointments"
        className={styles.link}
        activeClassName={styles.linkSelected}
        onClick={singOut}
        role="button"
      >
        Cerrar sesión
      </div>
    </div>
  );
};

export default MenuRight;
