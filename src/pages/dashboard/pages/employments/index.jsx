/* eslint-disable no-unused-vars */
import { Box, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Card from 'src/components/card';
import Button from 'src/components/main/button';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import useFetch from 'src/hooks/useFetch';
import emplymentModel from 'src/core/models/employments';
import { func } from 'prop-types';
import NewEmployment from './components/newEmployment';
import Loading from '../../../../components/loading';
import EmploymentCard from './components/employmentCard';
import withNotifications from '../../../../highOrderComponents/withNotification';
import withAlert from '../../../../highOrderComponents/withAlert';
import UpdateEmployment from './components/updateEmployment';
import AddBranchIntoEmployment from './components/addBranch';

const Employments = ({ setNotification, setAlert }) => {
  const [idUserAdding, setAddingBranch] = useState(null);
  const [isModalNewEmploymentOpen, setModalNewEmployment] = useState(false);
  const [employmentEditing, setEmploymentEditing] = useState(null);
  const [employments, setEmployments] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleNewEmploymentModalOpen = () => setModalNewEmployment(true);
  const handleNewEmploymentModalClose = () => setModalNewEmployment(false);

  const handleFetch = async () => {
    const employmentsList = await emplymentModel.getEmploymentList();
    setEmployments(employmentsList);
    setLoading(false);
  };

  const handleDelete = async (employmentId) => {
    setAlert({
      title: '¿Seguro quieres eliminar el empleado?',
      action: async () => {
        const { status } = await emplymentModel.deleteEmployment(employmentId);
        if (status === 'success') {
          setNotification({ type: 'success', message: 'El empleado se elimino correctamente' });
          handleFetch();
        } else {
          setNotification({
            type: 'error',
            message: 'Error al eliminar el empleado',
          });
        }
      },
    });
  };

  const handleBranchDelete = (employmentID, branchId) => {
    setAlert({
      title: '¿Eliminar acceso del usuario al sucursal?',
      action: async () => {
        const { status } = await emplymentModel.deleteBranch(employmentID, branchId);
        if (status === 'success') {
          setNotification({ type: 'success', message: 'El acceso del usuario se elimino correctamente' });
          handleFetch();
        } else {
          setNotification({ type: 'error', message: 'Error en la operacion' });
        }
      },
    });
  };

  useFetch(handleFetch);

  return (
    <>
      <NewEmployment
        open={isModalNewEmploymentOpen}
        onClose={handleNewEmploymentModalClose}
        onSuccess={handleFetch}
      />
      <UpdateEmployment
        onClose={() => setEmploymentEditing(null)}
        open={!!employmentEditing}
        onSuccess={handleFetch}
        initialData={employmentEditing || {}}
      />
      <AddBranchIntoEmployment
        open={idUserAdding}
        onClose={() => setAddingBranch(null)}
        employmentId={idUserAdding}
        onSuccess={handleFetch}
      />
      <Card>
        <Grid container justify="space-between" alignItems="center">
          <Text color={colors.blue} fontWeight="bold" fontSize="1.2em">
            Empleados
          </Text>
          <Button variant="contained" color={colors.green} onClick={handleNewEmploymentModalOpen}>
            Nuevo empleado
          </Button>
        </Grid>
      </Card>

      {isLoading && (<Loading />)}

      {!isLoading && !!employments.length && (
        <Box marginTop="2em">
          <Grid container>
            {employments.map((employment) => (
              <Grid item xs={12} sm={6} key={employment.id}>
                <Box padding=".5em" height="100%" boxSizing="border-box">
                  <EmploymentCard
                    name={employment.name}
                    lastName={employment.lastName}
                    email={employment.email}
                    password={employment.password}
                    onDelete={() => handleDelete(employment.id)}
                    onEdit={() => setEmploymentEditing(employment)}
                    branches={employment.branches || []}
                    onAdd={() => setAddingBranch(employment.id)}
                    onBranchDelete={(branchId) => handleBranchDelete(employment.id, branchId)}
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

Employments.propTypes = {
  setNotification: func.isRequired,
  setAlert: func.isRequired,
};

export default withAlert(withNotifications(Employments));
