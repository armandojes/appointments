/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import branchesModel from 'src/core/models/branches';
import Card from '../../../../components/card';
import Empty from '../../../../components/empty';
import Loading from '../../../../components/loading';
import Text from '../../../../components/main/text';
import { colors } from '../../../../constants';
import useFetch from '../../../../hooks/useFetch';
import useSession from '../../../../session/useSession';
import styles from './styles.module.css';

const BranchSelector = () => {
  const session = useSession();
  const [branches, setBranches] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // fetch branches
  useFetch(async () => {
    if (session.type === 'admin') {
      const list = await branchesModel.list();
      setBranches(list);
      setLoading(false);
    }
  });

  if (session.type !== 'employment' && session.type !== 'admin') {
    return <Redirect to="/" />;
  }

  if (session.type === 'employment' && !session.branchId) {
    return <Empty message="Aún no tienes una sucursal asociado a tu cuenta" />;
  }

  if (session.type === 'employment' && session.branchId) {
    return <Redirect to={`/dashboard/appointments/${session.branchId}`} />;
  }

  if (isLoading) return <Loading />;

  return (
    <div>
      <Card>
        <Text color={colors.blue} fontSize="1.2em" fontWeight="bold">Selecciona una sucursal</Text>
      </Card>
      {!isLoading && !!branches.length && (
        <div className={styles.listWrapper}>
          {branches.map((branch) => (
            <Link to={`/dashboard/appointments/${branch.id}`} className={styles.cardWrapper}>
              <Card className={styles.card}>
                <Text>{branch.name}</Text>
              </Card>
            </Link>
          ))}
        </div>
      )}
      {!isLoading && !branches.length && (
        <Empty message="Aún no tienes sucursales" />
      )}
    </div>
  );
};

export default BranchSelector;
