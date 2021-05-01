import { Box, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';
import Button from '../../../../components/main/button';
import Text from '../../../../components/main/text';
import { colors } from '../../../../constants';
import profiles from '../../../../core/models/profiles';
import useErrorMessage from '../../../../hooks/useErrorMessage';
import useFetch from '../../../../hooks/useFetch';
import useForm from '../../../../hooks/useForm';
import useNotification from '../../../../notifications/useSession';
import Form from './components/form';
import StudiesSelector from './components/StudiesSelector';
import styles from './styles.module.css';

const ProfileEditor = () => {
  const { profileId } = useParams();
  const setNotification = useNotification();
  const history = useHistory();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const { getInputProps, handleValidateForm, setValues, values } = useForm({ studies: [] });
  const [currentStep, setStep] = useState('form');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const response = await profiles.create(values);
    if (response.status === 'success') {
      setNotification({ type: 'success', message: 'Perfil creado correctamente' });
      history.replace('/dashboard/profiles');
    } else {
      setLoading(false);
      setNotification({ type: 'error', message: response.errorMessage });
    }
    return null;
  };

  const handleUpdate = async () => {
    setLoading(true);
    const response = await profiles.update(profileId, values);
    if (response.status === 'success') {
      setNotification({ type: 'success', message: 'Perfil actualizado correctamente' });
      history.replace('/dashboard/profiles');
    } else {
      setLoading(false);
      setNotification({ type: 'error', message: response.errorMessage });
    }
    return null;
  };

  const handleFormNext = () => {
    const errors = handleValidateForm({
      title: (val) => (!val || val.toString().length < 3 ? 'El titulo es requerido' : null),
    });
    if (Object.values(errors).length) setErrorMessage(Object.values(errors)[0]);
    else setStep('stdudySelector');
  };

  const handleNextStudySelector = () => {
    if (!values.studies.length) return setErrorMessage('Selecciona al menos 1 etudio');
    if (profileId) return handleUpdate();
    return handleSave();
  };

  const handleFormBack = () => history.goBack();
  const handleStudySelcetorBack = () => setStep('form');

  const handleItemToogle = (id) => {
    setValues((prevValues) => (prevValues.studies.includes(id)
      ? { ...prevValues, studies: prevValues.studies.filter((item) => item !== id) }
      : { ...prevValues, studies: [...prevValues.studies, id] }));
  };

  // fetch data if editing
  useFetch(async () => {
    if (profileId) {
      setLoading(true);
      const data = await profiles.getSingle(profileId);
      setValues(data);
      setLoading(false);
    }
  });

  return (
    <>
      {loading && <Loading message="Cargando..." />}
      {!loading && (
        <>
          <Box className={styles.card} style={{ padding: 0 }} mb="2em">
            <Text color={colors.blue} fontSize="1.2em" fontWeight="bold">
              {profileId ? 'Actualizar perfil' : 'Crear perfil'}
            </Text>
          </Box>
          <Card className={styles.card}>
            {currentStep === 'form' && (
            <Form
              getInputProps={getInputProps}
              errorMessage={errorMessage}
            />
            )}
            {currentStep === 'stdudySelector' && (
            <StudiesSelector
              errorMessage={errorMessage}
              onItemToggle={handleItemToogle}
              itemsSelected={values.studies}
            />
            )}
          </Card>
          <Box className={styles.card} style={{ padding: '2em 0em' }}>
            <Grid container justify="flex-end" wrap="nowrap">
              {currentStep === 'form' && (
              <>
                <Button onClick={handleFormBack} className={styles.button} variant="outlined">Volver</Button>
                <Box marginRight="1em" />
                <Button onClick={handleFormNext} className={styles.button} variant="contained">Siguente</Button>
              </>
              )}
              {currentStep === 'stdudySelector' && (
              <>
                <Button onClick={handleStudySelcetorBack} className={styles.button} variant="outlined">Volver</Button>
                <Box marginRight="1em" />
                <Button onClick={handleNextStudySelector} className={styles.button} variant="contained">Guardar</Button>
              </>
              )}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default ProfileEditor;
