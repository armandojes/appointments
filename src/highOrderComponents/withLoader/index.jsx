/* eslint-disable react/jsx-props-no-spreading */
import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './styles.module.css';

const withLoading = (WrapedComponent) => (props) => {
  const [isLoaderActive, setLoader] = useState(true);

  return (
    <>
      {isLoaderActive && (
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <CircularProgress className={styles.circularProgress} />
          </div>
        </div>
      )}
      <WrapedComponent {...props} setLoader={setLoader} />
    </>
  );
};

export default withLoading;
