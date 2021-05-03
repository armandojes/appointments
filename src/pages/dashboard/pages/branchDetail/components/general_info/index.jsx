/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import branchModel from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import Loading from 'src/components/loading';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import { Box, Grid } from '@material-ui/core';
import Card from 'src/components/card';
import { Edit } from '@material-ui/icons';
import Button from 'src/components/main/button';
import styles from './styles.module.css';
import EditGeneralInfoModal from '../edit_general_info';
import withAlert from '../../../../../../highOrderComponents/withAlert';
import limitText from '../../../../../../helpers/limitText';

const Generalinfo = ({ setAlert }) => {
  const [branch, setBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const { branchId } = useParams();
  const history = useHistory();

  const handleModalClose = () => setModalOpen(false);

  const handleModalOpen = () => setModalOpen(true);

  const handlefetch = async () => {
    const branchData = await branchModel.getSingle(branchId);
    setBranch(branchData);
    setIsLoading(false);
  };

  useFetch(handlefetch, []);

  const Rows = ({ value, name }) => (
    <Box marginBottom=".7em">
      <Grid container alignItems="center">
        <Text marginRight="1em" color="gray">{name}:</Text>
        <Text color={colors.green}>{value}</Text>
      </Grid>
    </Box>
  );

  const handleDelete = () => {
    setAlert({
      title: '¿Seguro quieres eliminar esta sucursal?',
      message: 'Tambien eliminara toda la información de las citas en esta sucursal',
      action: async () => {
        await branchModel.deleteBranche(branchId);
        history.replace('/dashboard/branches');
      },
    });
  };

  return (
    <>
      <EditGeneralInfoModal
        data={branch || {}}
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handlefetch}
      />
      {isLoading && (<Loading />)}
      {!isLoading && (
        <Card>
          <div className={styles.buttonWrapper}>
            <Button className={styles.button} color={colors.green} onClick={handleModalOpen}>
              <Text>Editar</Text>
            </Button>
            <Button className={styles.button} color="red" onClick={handleDelete}>
              <Text>Eliminar</Text>
            </Button>
          </div>
          <Text color={colors.blue} fontWeight="bold" fontSize="1.2em" marginBottom="1em">Información general</Text>
          <Rows name="id" value={branch.id} />
          <Rows name="Nombre" value={branch.name} />
          <Rows name="Dirección" value={branch.address} />
          <Rows name="Teléfono" value={branch.phones.join(', ')} />
          {branch.maps && <Rows name="Link de google maps" value={limitText(branch.maps || '', 50)} />}
        </Card>
      )}
    </>
  );
};

export default withAlert(Generalinfo);
