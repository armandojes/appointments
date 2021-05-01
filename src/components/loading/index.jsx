/* eslint-disable import/order */
import React from 'react';
import { colors } from '../../constants';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import Text from '../main/text';
import { string } from 'prop-types';

const Loading = ({ message }) => (
  <Grid component={Box} justify="center" alignItems="center" minHeight="400px" container flexDirection="column">
    <Text marginBottom="2em" color={colors.green}>{message}</Text>
    <CircularProgress style={{ color: colors.green }} />
  </Grid>
);

Loading.defaultProps = {
  message: 'Cargando datos...',
};

Loading.propTypes = {
  message: string,
};

export default Loading;
