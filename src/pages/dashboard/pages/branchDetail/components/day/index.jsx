/* eslint-disable max-len */
import { Grid, Switch } from '@material-ui/core';
import { func, bool, string, instanceOf, number } from 'prop-types';
import React from 'react';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import Button from '../../../../../../components/main/button';
import { colors, days } from '../../../../../../constants';
import { formatToHourAndMinute } from '../../../../../../helpers/dates';
import styles from './styles.module.css';

const Day = ({ label, start, end, interval, isEnabled, onStatusChange, onEditClick }) => {
  const inlineStyle = { filter: !isEnabled ? 'grayScale(1)' : 'none' };

  return (
    <Card className={styles.card} style={inlineStyle}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Text fontWeight="bold" color={colors.blue}>{days[label]}</Text>
          <Grid container>
            <Text color={colors.green}>
              De {formatToHourAndMinute(start)} a {formatToHourAndMinute(end)} horas cada {interval} minutos
            </Text>
          </Grid>
        </Grid>
        <Grid item>
          <Switch color="primary" defaultChecked={isEnabled} onChange={(event) => onStatusChange(event.target.checked)} />
          <Button color={colors.green} className={styles.button} onClick={onEditClick}>Editar</Button>
        </Grid>
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
};

export default Day;
