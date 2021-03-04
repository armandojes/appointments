/* eslint-disable import/order */
import React from 'react';
import { colors } from '../../../constants';
import { Box, Grid } from '@material-ui/core';
import Text from '../text';
import { string } from 'prop-types';
import { SentimentVeryDissatisfied } from '@material-ui/icons';
import styles from './styles.module.css';

const Empty = ({ message }) => (
  <Grid component={Box} justify="center" alignItems="center" minHeight="400px" container flexDirection="column">
    <SentimentVeryDissatisfied className={styles.icon} />
    <Text marginBottom="2em" color={colors.green}>
      {message}
    </Text>
  </Grid>
);

Empty.propTypes = {
  message: string.isRequired,
};

export default Empty;
