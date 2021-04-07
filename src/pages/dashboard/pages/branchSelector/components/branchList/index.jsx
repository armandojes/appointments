/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import branchesModel from 'src/core/models/branches';
import Card from 'src/components/card';
import Loading from 'src/components/loading';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import useFetch from 'src/hooks/useFetch';
import { Link } from 'react-router-dom';
import Empty from 'src/components/empty';
import styles from './styles.module.css';

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // fetch branches
  useFetch(async () => {
    const list = await branchesModel.list();
    setBranches(list);
    setLoading(false);
  });

  return (
    <div>
      <Card>
        <Text color={colors.blue} fontSize="1.2em" fontWeight="bold">Selecciona una sucursal</Text>
      </Card>
      {!!isLoading && (<Loading />)}
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

export default BranchList;
