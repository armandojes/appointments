/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { Box, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Card from 'src/components/card';
import Button from 'src/components/main/button';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import useFetch from 'src/hooks/useFetch';
import emplymentModel from 'src/core/models/employments';
import NewEmployment from './components/newEmployment';
import Loading from '../../../../components/loading';
import EmploymentCard from './components/employmentCard';

const Employments = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [employments, setEmployments] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useFetch(async () => {
    const employmentsList = await emplymentModel.getEmploymentList();
    setEmployments(employmentsList);
    setLoading(false);
  });

  const skeleton = [...new Array(3)];

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

      {isLoading && (<Loading />)}

      {!isLoading && !!employments.length && (
        <Box marginTop="2em">
          <Grid container>
            {employments.map((employment) => (
              <Grid item xs={12} sm={6} md={4}>
                <Box padding=".5em" height="100%" boxSizing="border-box">
                  <EmploymentCard
                    name={employment.name}
                    lastName={employment.lastName}
                    email={employment.email}
                    password={employment.password}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Employments;
