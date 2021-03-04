/* eslint-disable import/order */
import React from 'react';
import { colors } from '../../../constants';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import Text from '../text';

const Loading = () => (
  <Grid component={Box} justify="center" alignItems="center" minHeight="400px" container flexDirection="column">
    <Text marginBottom="2em" color={colors.green}>Cargando datos...</Text>
    <CircularProgress style={{ color: colors.green }} />
  </Grid>
);

export default Loading;
