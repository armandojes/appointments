/* eslint-disable no-unused-vars */
import { Box } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { array, func, string } from 'prop-types';
import React from 'react';
import ubicationIconSrc from 'src/assets/icono_ubicacion.png';
import ErrorMessage from 'src/components/errorMessage';
import Header from '../header';
import styles from './styles.module.css';

const SelectBranch = ({ items, onItemClick, branch, errorMessage }) => (
  <div className={styles.wrapper}>
    <Box marginBottom="3em">
      <Header title="Selecciona la sucursal*" step={2} icon={ubicationIconSrc} />
    </Box>
    <ErrorMessage message={errorMessage} />
    <div className={styles.listWrapper}>
      {items.map((currentItem) => (
        <div role="button" className={styles.itemWrapper} onClick={onItemClick} id={currentItem.id} key={currentItem.id}>
          <div className={styles.item}>
            <div className={`${styles.checkbox} ${branch === currentItem.id ? styles.checkboxSelected : ''}`}>
              {branch === currentItem.id && <Check />}
            </div>
            <div>
              <div className={styles.itemTitle}>{currentItem.name}</div>
              <div className={styles.textGray}>
                Tel. {currentItem.phones.map((phone, index) => (
                index ? ` / ${phone}` : phone
              ))}
              </div>
              <div className={styles.textGray}>
                {currentItem.address}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

SelectBranch.propTypes = {
  items: array.isRequired,
  onItemClick: func.isRequired,
  branch: string.isRequired,
  errorMessage: string.isRequired,
};

export default SelectBranch;
