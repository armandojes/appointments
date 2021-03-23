/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { Box, Grid, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { func, number, string } from 'prop-types';
import React from 'react';
import Card from 'src/components/card';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import styles from './styles.module.css';

const ApprovedCard = ({ companyAddress, companyEmail, companyName, companyPhone, companyRFC, companyRazonSocial, userEmail, userFullName, onDelete, onEdit }) => (
  <Card>
    <Box textAlign="center">
      <Box marginBottom="2em" marginTop="1em">
        <Grid container justify="center">
          <IconButton className={styles.iconWrapper} onClick={onDelete}>
            <Delete />
          </IconButton>
          <IconButton className={styles.iconWrapper} onClick={onEdit}>
            <Edit />
          </IconButton>
        </Grid>
      </Box>
      <Text lineHeight="1.4em" color={colors.green}>Datos del usuario</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{userFullName}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{userEmail}</Text>
      <Box marginBottom="1.5em" />
      <Text lineHeight="1.4em" color={colors.green}>Datos de la empresa</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyName}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyEmail}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyPhone}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyAddress}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyRFC}</Text>
      <Text lineHeight="1.4em" fontSize="1.1em" color={colors.blue}>{companyRazonSocial}</Text>
    </Box>
  </Card>
);

ApprovedCard.propTypes = {
  companyAddress: string.isRequired,
  companyEmail: string.isRequired,
  companyName: string.isRequired,
  companyPhone: number.isRequired,
  companyRFC: string.isRequired,
  companyRazonSocial: string.isRequired,
  userEmail: string.isRequired,
  userFullName: string.isRequired,
  onDelete: func.isRequired,
  onEdit: func.isRequired,
};

export default ApprovedCard;
