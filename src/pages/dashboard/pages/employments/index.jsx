/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Card from 'src/components/card';
import Button from 'src/components/main/button';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import NewEmployment from './components/newEmployment';

const Employments = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <NewEmployment
        open={isModalOpen}
        onClose={handleModalClose}
      />
      <Card>
        <Grid container justify="space-between" alignItems="center">
          <Text color={colors.blue} fontWeight="bold" fontSize="1.2em">
            Empleados
          </Text>
          <Button variant="contained" color={colors.green} onClick={handleModalOpen}>
            Nuevo empleado
          </Button>
        </Grid>
      </Card>
    </>
  );
};

export default Employments;
