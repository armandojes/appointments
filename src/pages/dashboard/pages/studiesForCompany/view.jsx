import { Box, CircularProgress, Grid } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { array, bool, func, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';
import Button from '../../../../components/main/button';
import Text from '../../../../components/main/text';
import { colors } from '../../../../constants';
import styles from './styles.module.css';

const View = ({ companyName, isLoading, studies, onStudyToogleStatus, profiles, onProfileToggleStatus }) => (
  <>
    {isLoading && (
      <Loading />
    )}
    {!isLoading && studies && studies.length && (
      <>
        <Card>
          <Text fontSize="1.2em" fontWeight="bold" color={colors.blue}>{companyName}</Text>
        </Card>
        <Box paddingTop="2em" />
        <Grid container alignItems="center">
          <Text color={colors.green} fontWeight="bold">Estudios</Text>
          <Box flexGrow="1" borderBottom="1px solid #0fafab4f" marginLeft="1em" />
        </Grid>
        <Grid container>
          {studies.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Box padding=".5em" minHeight="100%" display="flex" boxSizing="border-box">
                <Card className={styles.studyCard}>
                  <Text fontWeight="bold" color={colors.blue}>{item.title}</Text>
                  {item.isLoading && (<CircularProgress className={styles.iconLoader} />)}
                  {!item.isLoading && (
                    <div className={`${styles.checkbox} ${item.isAvailable ? styles.checkboxActive : ''}`} onClick={() => onStudyToogleStatus(item)} role="button">
                      {item.isAvailable && <Check />}
                    </div>
                  )}
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid container alignItems="center">
          <Text color={colors.green} fontWeight="bold">Perfiles</Text>
          <Box flexGrow="1" borderBottom="1px solid #0fafab4f" marginLeft="1em" />
        </Grid>
        <Grid container>
          {profiles.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Box padding=".5em" minHeight="100%" display="flex" boxSizing="border-box">
                <Card className={styles.studyCard}>
                  <Text fontWeight="bold" color={colors.blue}>{item.title}</Text>
                  {item.isLoading && (<CircularProgress className={styles.iconLoader} />)}
                  {!item.isLoading && (
                    <div className={`${styles.checkbox} ${item.isAvailable ? styles.checkboxActive : ''}`} onClick={() => onProfileToggleStatus(item)} role="button">
                      {item.isAvailable && <Check />}
                    </div>
                  )}
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box paddingLeft=".5em" marginTop="2em">
          <Link to="/dashboard/companies">
            <Button padding=".6em 2em" variant="contained" color={colors.green}>Regresar</Button>
          </Link>
        </Box>
      </>
    )}
  </>
);

View.propTypes = {
  companyName: string.isRequired,
  isLoading: bool.isRequired,
  studies: array.isRequired,
  onStudyToogleStatus: func.isRequired,
  profiles: array.isRequired,
  onProfileToggleStatus: func.isRequired,
};

export default View;
