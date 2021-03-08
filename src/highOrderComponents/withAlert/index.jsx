/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Button from '../../components/main/button';
import Text from '../../components/main/text';
import Modal from '../../components/modal';
import { colors } from '../../constants';
import styles from './styles.module.css';

const Alert = ({ title, message, action, isLoading, open, cancel }) => (
  <Modal open={open}>
    <div className={styles.wrapper}>
      {!isLoading && (
        <>
          {!!title && <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">{title}</Text>}
          {!!message && <Text color={colors.blue}>{message}</Text>}
          <Grid container className={styles.buttonContainer} wrap="nowrap">
            <Button color={colors.green} width="100%" onClick={cancel}>
              Cancelar
            </Button>
            <Box padding=".5em" />
            <Button color={colors.green} width="100%" onClick={action} variant="contained">
              Aceptar
            </Button>
          </Grid>
        </>
      )}

      {isLoading && (
        <>
          <CircularProgress />
        </>
      )}
    </div>
  </Modal>
);

const withAlert = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const [state, setState] = useState({});

    const handleActionTrigger = async () => {
      setState((val) => ({ ...val, isLoading: true }));
      await state.action();
      setState({});
    };

    const handleCancel = () => setState({});

    return (
      <>
        <Alert
          {...state}
          action={handleActionTrigger}
          open={!!state.title || state.message}
          cancel={handleCancel}
        />
        <WrappedComponent
          {...props}
          setAlert={setState}
        />
      </>
    );
  };

  return EnhancedComponent;
};

export default withAlert;
