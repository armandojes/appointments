/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import branchModel from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import Loading from 'src/components/loading';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import { Box, Grid } from '@material-ui/core';
import Card from 'src/components/card';
import { Edit } from '@material-ui/icons';
import styles from './styles.module.css';
import Button from '../../../../../../components/main/button';

const Generalinfo = () => {
  const [branch, setBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { branchId } = useParams();

  useFetch(async () => {
    const branchData = await branchModel.getSingle(branchId);
    setBranch(branchData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  const Rows = ({ value, name }) => (
    <Box marginBottom=".7em">
      <Grid container alignItems="center">
        <Text marginRight="1em" color="gray">{name}:</Text>
        <Text color={colors.green}>{value}</Text>
      </Grid>
    </Box>
  );

  return (
    <Card>
      <Button className={styles.button} variant="contained" color={colors.green}>
        <Edit />
        <Text>Editar</Text>
      </Button>
      <Text color={colors.blue} fontWeight="bold" fontSize="1.2em" marginBottom="1em">Informacion general</Text>
      <Rows name="id" value={branch.id} />
      <Rows name="Nombre" value={branch.name} />
      <Rows name="Direccion" value={branch.adress} />
      <Rows name="Telefono" value={branch.phones.join(', ')} />
    </Card>
  );
};

export default Generalinfo;
