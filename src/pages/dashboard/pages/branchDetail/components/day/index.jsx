/* eslint-disable max-len */
import { Box, Grid, IconButton, Switch } from '@material-ui/core';
import { NotInterested } from '@material-ui/icons';
import { func, bool, string, instanceOf, number } from 'prop-types';
import React from 'react';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import { colors, days } from 'src/constants';
import { toStringTime } from 'src/helpers/dates';
import styles from './styles.module.css';

const Day = ({ label, start, end, interval, isEnabled, onStatusChange, onEditClick, onDisabledClick }) => {
  const inlineStyle = { filter: !isEnabled ? 'grayScale(1)' : 'none' };

  return (
    <Card className={styles.card} style={inlineStyle}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Text fontWeight="bold" color={colors.blue}>{days[label]}</Text>
          <Grid container>
            <Text color={colors.green}>
              De {toStringTime(start)} a {toStringTime(end)} horas cada {interval} minutos
            </Text>
          </Grid>
        </Grid>
        <Box display="flex" alignItems="center">
          <Switch color="primary" defaultChecked={isEnabled} onChange={(event) => onStatusChange(event.target.checked)} />
          <IconButton color={colors.green} className={styles.button} onClick={onDisabledClick}>
            <NotInterested />
          </IconButton>
          <Box marginRight=".5em" />
          <IconButton color={colors.green} className={styles.buttonEdit} onClick={onEditClick}>
            Editar
          </IconButton>
        </Box>
      </Grid>
    </Card>
  );
};

Day.propTypes = {
  label: string.isRequired,
  start: instanceOf(Date).isRequired,
  end: instanceOf(Date).isRequired,
  interval: number.isRequired,
  isEnabled: bool.isRequired,
  onStatusChange: func.isRequired,
  onEditClick: func.isRequired,
  onDisabledClick: func.isRequired,
};

export default Day;
