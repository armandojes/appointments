import React from 'react';
import { Redirect } from 'react-router';
import useSession from '../../session/useSession';

/**
 * @param {Element} WrappedComponent
 * @param {Object} config
 * @param {Boolean} config.companyManager
 * @param {Boolean} config.admin
 * @param {Boolean} config.employment
 */
const withAuth = (WrappedComponent, config = {}) => (props) => {
  const session = useSession();

  if (!session) return <Redirect to="/" />;

  if (!config.admin && session.type === 'admin') return <Redirect to="/dashboard" />;

  if (!config.employment && session.type === 'employment') return <Redirect to="/dashboard/appointments" />;

  if (!config.companyManager && session.type === 'companyManager') return <Redirect to="/create-appointment" />;

  return (
    <WrappedComponent {...props} />
  );
};

export default withAuth;
