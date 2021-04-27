/* eslint-disable no-unused-vars */
import { Box, Grid, Hidden, styled } from '@material-ui/core';
import { array, bool, func, string } from 'prop-types';
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
import Input from '../../../../components/main/input';
import Caption from '../../../../components/caption';

const View = ({ items, isLoading, onDeleteItem, onEditItem, keywords, onKeywordChange }) => (
  <>
    <Box marginBottom="1em">
      <Card>
        <Grid container justify="space-between" alignItems="center">
          <Text fontSize="1.2em" fontWeight="bold">Estudios</Text>
          <div>
            <Grid container wrap="nowrap" alignItems="center">
              <Hidden xsDown>
                <Box marginRight="1.5em">
                  <Input value={keywords} onChange={onKeywordChange} variant="underline" placeholder="buscar" padding=".2em" />
                </Box>
              </Hidden>
              <Link to="/dashboard/study-editor">
                <Button width="8em" color={colors.green} variant="contained">Crear estudio</Button>
              </Link>
            </Grid>
          </div>
        </Grid>
      </Card>
    </Box>

    {(!items || !items.length) && !isLoading && (
      <Empty message={keywords ? 'No encontramos resultados' : 'Aún no tienes estudios'} />
    )}
    {isLoading && (
      <Loading message="Aún no tienes estudios" />
    )}
    {!!items && !!items.length && !isLoading && (
    <Box marginTop="2em">
      <div>
        <div className={styles.rowHeader}>
          <div className={styles.code}>CÓDIGO</div>
          <div className={styles.title}>ESTUDIO</div>
        </div>
        {items.map((item) => (
          <div className={styles.row} key={item.id}>
            <div className={styles.code}>{item.code || 'withoutCode'}</div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.actionsContainer}>
              <Caption message="Editar">
                <Edit className={styles.icons} onClick={() => onEditItem(item)} />
              </Caption>
              <Caption message="Eliminar">
                <Delete className={styles.icons} onClick={() => onDeleteItem(item)} />
              </Caption>
            </div>
          </div>
        ))}
      </div>
    </Box>
    )}
  </>
);

View.propTypes = {
  items: array.isRequired,
  isLoading: bool.isRequired,
  onDeleteItem: func.isRequired,
  onEditItem: func.isRequired,
  keywords: string.isRequired,
  onKeywordChange: func.isRequired,
};

export default View;
