/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/loading';
import Text from '../../../../components/main/text';
import branchesModel from '../../../../core/models/branches';
import useFetch from '../../../../hooks/useFetch';

const BranchDetail = () => {
  const [branch, setBranch] = useState();
  const [isLoading, setLoading] = useState(true);
  const { branchId } = useParams();

  useFetch(async () => {
    const branchData = await branchesModel.getSingle(branchId);
    setBranch(branchData);
    setLoading(false);
  }, []);

  return (
    <div>
      {isLoading && (<Loading />)}
      {!isLoading && (
        <div>
          <Text fontSize="1.5em" marginBottom="1em">Sucursal {branch.name}</Text>
        </div>
      )}
    </div>
  );
};

export default BranchDetail;
