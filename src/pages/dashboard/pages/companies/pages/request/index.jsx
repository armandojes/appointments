/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { Box, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { getRequests } from 'src/core/models/companies';
import useFetch from 'src/hooks/useFetch';
import Loading from 'src/components/loading';
import Empty from 'src/components/empty';
import Requestcard from '../../components/requestCard';

const Requests = () => {
  const [state, setState] = useState({ loading: true, items: [] });

  useFetch(async () => {
    const list = await getRequests();
    setState({ loading: false, items: list });
  });

  if (state.loading) return <Loading />;

  if (!state.loading && !state.items.length) return <Empty message="Aún no hay solicitudes" />;

  return (
    <Grid container>
      {state.items.map((item) => (
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
            />
          </Box>
        </Grid>
      ))}

    </Grid>
  );
};

export default Requests;
