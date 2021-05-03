import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import branchModel, { updateMapUrl, uploadPictureMap } from 'src/core/models/branches';
import useFetch from 'src/hooks/useFetch';
import Card from 'src/components/card';
import { useDropzone } from 'react-dropzone';
import { Box, CircularProgress } from '@material-ui/core';
import { func } from 'prop-types';
import withAlert from 'src/highOrderComponents/withAlert';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import useNotification from 'src/notifications/useSession';
import Button from 'src/components/main/button';
import styles from './styles.module.css';

const MapPicture = ({ setAlert }) => {
  const setNotification = useNotification();
  const [currentImage, setCurrentImage] = useState(null);
  const [view, setView] = useState();
  const { branchId } = useParams();

  const handlefetch = async () => {
    const { mapPicture } = await branchModel.getSingle(branchId);
    if (mapPicture) {
      setCurrentImage(mapPicture);
      setView('picture');
    } else {
      setView('form');
    }
  };

  const handleDeleteWithAlert = () => {
    setAlert({
      title: '¿Seguro quieres eliminar el mapa de la sucursal?',
      action: async () => {
        const response = await updateMapUrl(branchId, null);
        await handlefetch();
        if (response.status === 'success') setNotification({ type: 'success', message: 'Imagen actualizado correctamente' });
        else setNotification({ type: 'error', message: response.errorMessage });
      },
    });
  };

  const handleDrag = async (files) => {
    if (files && files[0]) {
      setView('loading');
      const mapUrl = await uploadPictureMap(branchId, files[0]);
      const response = await updateMapUrl(branchId, mapUrl);
      await handlefetch();
      if (response.status === 'success') setNotification({ type: 'success', message: 'Imagen actualizado correctamente' });
      else setNotification({ type: 'error', message: response.errorMessage });
    }
  };

  useFetch(handlefetch, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop: handleDrag, multiple: false, accept: 'image/jpeg, image/png' });

  if (!view) return null;

  return (
    <Card>
      <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">Mapa del sucursal</Text>
      {view === 'loading' && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      )}
      {view === 'form' && (
        <div className={styles.inputFile} {...getRootProps()}>
          <Text color={colors.green}>Seleccionar imagen</Text>
          <input {...getInputProps()} />
        </div>
      )}
      {view === 'picture' && (
        <Box padding="2em 0em">
          <img src={currentImage} alt="icono de mapa de sucursal" className={styles.map} />
          <Button className={styles.button} onClick={handleDeleteWithAlert}>Eliminar</Button>
        </Box>
      )}
    </Card>
  );
};

MapPicture.propTypes = {
  setAlert: func.isRequired,
};

export default withAlert(MapPicture);
