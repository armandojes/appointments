/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { Box, Grid } from '@material-ui/core';
import { array, bool, func } from 'prop-types';
import React from 'react';
import Card from 'src/components/card';
import Button from 'src/components/main/button';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import Empty from '../../../../components/empty';
import Loading from '../../../../components/loading';

const View = ({ items, isLoading, onDeleteItem }) => (
  <>
    <Box marginBottom="1em">
      <Card>
        <Grid container justify="space-between" alignItems="center">
          <Text fontSize="1.2em" fontWeight="bold">Estudios</Text>
          <Button color={colors.green} variant="contained">Crear estudio</Button>
        </Grid>
      </Card>
    </Box>
    {(!items || !items.length) && !isLoading && (
      <Empty message="Aún no tienes estudios" />
    )}
    {isLoading && (
      <Loading message="Aún no tienes estudios" />
    )}
  </>
);

View.propTypes = {
  items: array.isRequired,
  isLoading: bool.isRequired,
  onDeleteItem: func.isRequired,
};

export default View;
