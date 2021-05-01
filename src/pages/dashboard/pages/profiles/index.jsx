/* eslint-disable arrow-body-style */
import { Grid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../../components/card';
import Button from '../../../../components/main/button';
import Text from '../../../../components/main/text';
import { colors } from '../../../../constants';

const Profiles = () => {
  return (
    <div>
      <Card>
        <Grid container alignItems="center" justify="space-between">
          <Text fontSize="1.2em" color={colors.blue} fontWeight="bold">
            Pefiles
          </Text>
          <Link to="/dashboard/profiles/editor">
            <Button padding=".5em 1em" variant="contained" color={colors.green}>Crear perfil</Button>
          </Link>
        </Grid>
      </Card>
    </div>
  );
};

export default Profiles;
