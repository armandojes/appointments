/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import addSrc from 'src/assets/floating_ad.jpg';
import styles from './styles.module.css';

const FloatingAds = () => {
  const [isOpen, setOpen] = useState(true);

  const handleClose = () => setOpen(false);
  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.wrapper} onClick={handleClose}>
      <div onClick={handleImageClick} className={styles.imageWrapper}>
        <Close className={styles.close} onClick={handleClose} />
        <img src={addSrc} className={styles.image} alt="floating ads" />
      </div>
    </div>
  );
};

export default FloatingAds;
