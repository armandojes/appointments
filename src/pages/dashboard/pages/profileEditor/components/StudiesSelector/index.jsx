/* eslint-disable no-unused-vars */
import { Box, CircularProgress } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { array, func, string } from 'prop-types';
import React, { useState } from 'react';
import Empty from 'src/components/empty';
import Loading from 'src/components/loading';
import studies from 'src/core/models/studies';
import useFetch from 'src/hooks/useFetch';
import ErrorMessage from '../../../../../../components/errorMessage';
import styles from './styles.module.css';

const StudiesSelector = ({ itemsSelected, onItemToggle, errorMessage }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useFetch(async () => {
    setLoading(true);
    const response = await studies.getStudies();
    setItems(response);
    setLoading(false);
  });

  return (
    <div>
      {loading && (
        <Loading />
      )}
      {!loading && (!items || !items.length) && (
        <Empty message="Aún no tienes estudios" />
      )}
      {!loading && items && !!items.length && (
        <>
          <ErrorMessage message={errorMessage} />
          <div className={styles.listWrapper}>
            {items.map((item) => (
              <div className={styles.itemWrapper} key={item.id}>
                <div className={styles.itemBody} onClick={() => onItemToggle(item.id)} role="button">
                  <div className={`${styles.checkbox} ${itemsSelected.includes(item.id) ? styles.checkboxSelected : ''}`}>
                    <Check />
                  </div>
                  <div className={styles.title}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

StudiesSelector.defaultProps = {
  errorMessage: '',
};

StudiesSelector.propTypes = {
  itemsSelected: array.isRequired,
  onItemToggle: func.isRequired,
  errorMessage: string,
};

export default StudiesSelector;
