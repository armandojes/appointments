import React from 'react';
import { Redirect } from 'react-router';
import Empty from '../../../../components/empty';
import useSession from '../../../../session/useSession';
import BranchList from './components/branchList';

const BranchSelector = () => {
  const session = useSession();

  if (session.type === 'admin') return <BranchList />;

  if (session.type === 'employment' && session.branchId) {
    return <Redirect to={`/dashboard/appointments/${session.branchId}`} />;
  }

  if (session.type === 'employment' && !session.branchId) {
    return <Empty message="Aún no tienes una sucursal asociado a tu cuenta" />;
  }

  if (session.type !== 'employment' && session.type !== 'admin') {
    return <Redirect to="/" />;
  }

  return null;
};

export default BranchSelector;
