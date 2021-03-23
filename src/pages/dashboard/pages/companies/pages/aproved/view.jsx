/* eslint-disable react/forbid-prop-types */
import { Box, Grid } from '@material-ui/core';
import { array, bool, func } from 'prop-types';
import React from 'react';
import Empty from 'src/components/empty';
import Loading from '../../../../../../components/loading';
import ApprovedCard from '../../components/approvedCard';

const View = ({ items, loading, onDelete, onEdit }) => (
  <>
    {loading && <Loading />}
    {!loading && !items.length && <Empty message="Aún no hay empresas registradas" />}
    {!loading && !!items.length && (
      <Grid container>
        {items.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Box padding="1em">
              <ApprovedCard
                userEmail={item.email}
                userFullName={item.fullName}
                companyName={item.company.name}
                companyEmail={item.company.email}
                companyAddress={item.company.address}
                companyPhone={item.company.phone}
                companyRFC={item.company.rfc}
                companyRazonSocial={item.company.razonSocial}
                onDelete={() => onDelete(item.id)}
                onEdit={() => onEdit(item.id)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    )}
  </>
);

View.propTypes = {
  items: array.isRequired,
  loading: bool.isRequired,
  onDelete: func.isRequired,
  onEdit: func.isRequired,
};

export default View;
