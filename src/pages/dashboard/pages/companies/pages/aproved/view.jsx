/* eslint-disable react/forbid-prop-types */
import { Box, Grid } from '@material-ui/core';
import { array, bool, func } from 'prop-types';
import React from 'react';
import Empty from 'src/components/empty';
import Loading from '../../../../../../components/loading';
import ApprovedCard from '../../components/approvedCard';
import HeaderCompanies from '../../components/headerPage';

const View = ({ items, loading, onDelete, onEdit, onCreate }) => (
  <>
    <HeaderCompanies onCreate={onCreate} />
    {loading && <Loading />}
    {!loading && !items.length && <Empty message="Aún no hay empresas registradas" />}
    {!loading && !!items.length && (
      <Grid container>
        {items.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Box padding="1em">
              <ApprovedCard
                userPassword={item.password}
                userEmail={item.email}
                userFullName={item.fullName}
                companyName={item.company.name}
                companyEmail={item.company.email}
                companyAddress={item.company.address}
                companyPhone={item.company.phone}
                companyRFC={item.company.rfc}
                companyRazonSocial={item.company.razonSocial}
                onDelete={() => onDelete(item.id)}
                onEdit={() => onEdit(item)}
                id={item.id}
                methodsPay={item.company.methodsPay || []}
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
  onCreate: func.isRequired,
};

export default View;
