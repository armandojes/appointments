import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

const MenuRight = () => (
  <div className={styles.menuWrapper}>
    <NavLink to="/dashboard/branches" className={styles.link} activeClassName={styles.linkSelected}>Sucursales </NavLink>
    <NavLink to="/dashboard/companies" className={styles.link} activeClassName={styles.linkSelected}>Empresas </NavLink>
    <NavLink to="/dashboard/employments" className={styles.link} activeClassName={styles.linkSelected}>Empleados </NavLink>
    <NavLink to="/dashboard/studies" className={styles.link} activeClassName={styles.linkSelected}>Estudios </NavLink>
    <NavLink to="/dashboard/appointments" className={styles.link} activeClassName={styles.linkSelected}>Citas</NavLink>
  </div>
);

export default MenuRight;
