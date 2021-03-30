/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { Box, Grid } from '@material-ui/core';
import { array, bool, func } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'src/components/card';
import Button from 'src/components/main/button';
import Text from 'src/components/main/text';
import { colors } from 'src/constants';
import Empty from 'src/components/empty';
import Loading from 'src/components/loading';
import labIconSrc from 'src/assets/lab.png';
import { Delete, Edit } from '@material-ui/icons';
import styles from './styles.module.css';

const View = ({ items, isLoading, onDeleteItem, onEditItem }) => (
  <>
    <Box marginBottom="1em">
      <Card>
        <Grid container justify="space-between" alignItems="center">
          <Text fontSize="1.2em" fontWeight="bold">Estudios</Text>
          <Link to="/dashboard/study-editor">
            <Button color={colors.green} variant="contained">Crear estudio</Button>
          </Link>
        </Grid>
      </Card>
    </Box>
    {(!items || !items.length) && !isLoading && (
      <Empty message="Aún no tienes estudios" />
    )}
    {isLoading && (
      <Loading message="Aún no tienes estudios" />
    )}
    {!!items && !!items.length && !isLoading && (
      <Grid container>
        {items.map((item) => (
          <Grid item xs={12} sm={4}>
            <Box padding=".5em">
              <Card className={styles.studyCard}>
                <div className={styles.actionContainer}>
                  <Edit className={styles.iconAction} onClick={() => onEditItem(item)} />
                  <Box mr="1em" />
                  <Delete className={styles.iconAction} onClick={() => onDeleteItem(item)} />
                </div>
                <img src={labIconSrc} alt="icono de laboratorio" className={styles.iconLab} />
                <Text
                  textAlign="center"
                  fontSize="1.2em"
                  color={colors.blue}
                  fontWeight="bold"
                >
                  {item.title}
                </Text>
                <Text
                  textAlign="center"
                  fontSize="1.2em"
                  color={colors.green}
                  fontWeight="bold"
                >
                  $ {item.price}.00
                </Text>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    )}
  </>
);

View.propTypes = {
  items: array.isRequired,
  isLoading: bool.isRequired,
  onDeleteItem: func.isRequired,
  onEditItem: func.isRequired,
};

export default View;
