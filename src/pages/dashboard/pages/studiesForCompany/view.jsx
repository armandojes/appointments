/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { array, bool, func, string } from 'prop-types';
import React from 'react';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';
import Text from '../../../../components/main/text';
import { colors } from '../../../../constants';
import styles from './styles.module.css';

const View = ({ companyName, isLoading, items, onItemStatusToggle }) => (
  <>
    {isLoading && (
      <Loading />
    )}
    {!isLoading && items && items.length && (
      <>
        <Card>
          <Text fontSize="1.2em" fontWeight="bold" color={colors.blue}>{companyName}</Text>
        </Card>
        <Box paddingTop="2em" />
        <Grid container>
          {items.map((item) => (
            <Grid item xs={12} sm={6}>
              <Box padding=".5em" minHeight="100%" display="flex" boxSizing="border-box">
                <Card className={styles.studyCard}>
                  <Text fontWeight="bold" color={colors.blue}>{item.title}</Text>
                  {item.isLoading && (<CircularProgress className={styles.iconLoader} />)}
                  {!item.isLoading && (
                    <div className={`${styles.checkbox} ${item.isAvailable ? styles.checkboxActive : ''}`} onClick={() => onItemStatusToggle(item)}>
                      {item.isAvailable && <Check />}
                    </div>
                  )}
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </>
    )}
  </>
);

View.propTypes = {
  companyName: string.isRequired,
  isLoading: bool.isRequired,
  items: array.isRequired,
  onItemStatusToggle: func.isRequired,
};

export default View;
