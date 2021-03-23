/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Loading from 'src/components/loading';
import Empty from 'src/components/empty';
import { Box, Grid } from '@material-ui/core';
import { array, bool, func } from 'prop-types';
import Requestcard from '../../components/requestCard';

const View = ({ loading, items, onDelete, onAprov }) => {
  if (loading) return <Loading />;

  if (!loading && !items.length) return <Empty message="Aún no hay solicitudes" />;

  return (
    <Grid container>
      {items.map((item) => (
        <Grid item xs={12} sm={6} key={item.id}>
          <Box padding=".5em">
            <Requestcard
              companyAddress={item.companyAddress}
              companyEmail={item.companyEmail}
              companyName={item.companyName}
              companyPhone={item.companyPhone}
              companyRFC={item.companyRFC}
              companyRazonSocial={item.companyRazonSocial}
              createdAt={item.createdAt}
              userEmail={item.userEmail}
              userFullName={item.userFullName}
              onDelete={() => onDelete(item.id)}
              onAprov={() => onAprov(item)}
            />
          </Box>
        </Grid>
      ))}

    </Grid>
  );
};

View.propTypes = {
  loading: bool.isRequired,
  items: array.isRequired,
  onDelete: func.isRequired,
  onAprov: func.isRequired,
};

export default View;