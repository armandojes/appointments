/* eslint-disable react/jsx-no-target-blank */
import { Box, Grid, Hidden } from '@material-ui/core';
import { Check, Email, Phone, WhatsApp } from '@material-ui/icons';
import { array, func, string } from 'prop-types';
import React from 'react';
import payouIconSrc from 'src/assets/icono_pago.png';
import ErrorMessage from '../../../../components/errorMessage';
import Button from '../../../../components/main/button';
import Input from '../../../../components/main/input';
import { contact, payoutData } from '../../../../constants';
import Header from '../header';
import styles from './styles.module.css';

const Payout = ({ payoutType, getInputProps, onPayouTypeChange, onConfirm, errorMessage, methodsPay }) => (
  <>
    <Header icon={payouIconSrc} title="Notificación de pago" step={4} />
    <div className={styles.body}>
      <ErrorMessage message={errorMessage} marginBottom="1em" />

      {!methodsPay.length && (
        <ErrorMessage
          marginBottom="1em"
          message={(
            <Box>
              Aún no tienes métodos de pago activado<br />
            </Box>
        )}
        />
      )}
      {methodsPay.includes('transfer') && (
        <div className={styles.itemWrapper} onClick={onPayouTypeChange} role="button" id="transfer">
          <div className={`${styles.checkbox} ${payoutType === 'transfer' ? styles.checkboxSelected : ''}`}>
            {payoutType === 'transfer' && <Check />}
          </div>
          <div className={styles.itemBody}>
            <div className={styles.itemTitle}>Transferencia</div>
            <div className={styles.itemdataRow}>Servicios Clínicos Especializados IML S.A. DE C.V.</div>
            <div className={styles.itemdataRow}><span className={styles.itemdataRowGreen}>INSTITUCION BANCARIA</span>: {payoutData.bankName}</div>
            <div className={styles.itemdataRow}><span className={styles.itemdataRowGreen}>CUENTA</span>: {payoutData.account} | <span className={styles.itemdataRowGreen}>SUCURSAL</span>: {payoutData.branch}</div>
            <div className={styles.itemdataRow}><span className={styles.itemdataRowGreen}>CLABE</span>: {payoutData.clabe}</div>
          </div>
        </div>
      )}

      {methodsPay.includes('branch') && (
        <div className={styles.itemWrapper} onClick={onPayouTypeChange} role="button" id="branch">
          <div className={`${styles.checkbox} ${payoutType === 'branch' ? styles.checkboxSelected : ''}`}>
            {payoutType === 'branch' && <Check />}
          </div>
          <div className={styles.itemBody}>
            <div className={styles.itemTitle}>Pago en Sucursal</div>
          </div>
        </div>
      )}

      {methodsPay.includes('credit') && (
        <div className={styles.itemWrapper} onClick={onPayouTypeChange} role="button" id="credit">
          <div className={`${styles.checkbox} ${payoutType === 'credit' ? styles.checkboxSelected : ''}`}>
            {payoutType === 'credit' && <Check />}
          </div>
          <div className={styles.itemBody}>
            <div className={styles.itemTitle}>Crédito</div>
          </div>
        </div>
      )}

      <Input variant="underline" placeholder="Comentarios" {...getInputProps('payoutComments')} />
      <Button variant="contained" className={styles.button} onClick={onConfirm}>AGENDAR</Button>

      <Box marginTop="4em" marginBottom="2em">
        <Grid container justify="center" alignItems="center">
          <a href="tel:4422130898" rel="nofollow">
            <div className={styles.contactWrapper}>
              <Phone className={styles.contactIcon} />
              Tel. 442 213 0898
            </div>
          </a>
          <Box marginRight="2em" />
          <a href={contact.whatsappLink} target="_blank" rel="nofollow">
            <div className={styles.contactWrapper}>
              <WhatsApp className={styles.contactIcon} />
              WhatsApp
            </div>
          </a>
          <Hidden mdDown>
            <>
              <Box marginRight="2em" />
              <a href={`mailto:${contact.email}`} rel="nofollow">
                <div className={styles.contactWrapper}>
                  <Email className={styles.contactIcon} />
                  {contact.email}
                </div>
              </a>
            </>
          </Hidden>
          <Hidden lgUp>
            <Box marginTop="1em" width="100%" display="flex" justifyContent="center">
              <a href={`mailto:${contact.email}`} rel="nofollow">
                <div className={styles.contactWrapper}>
                  <Email className={styles.contactIcon} />
                  {contact.email}
                </div>
              </a>
            </Box>
          </Hidden>
        </Grid>
      </Box>

    </div>
  </>
);

Payout.propTypes = {
  getInputProps: func.isRequired,
  payoutType: string.isRequired,
  onPayouTypeChange: func.isRequired,
  onConfirm: func.isRequired,
  errorMessage: string.isRequired,
  methodsPay: array.isRequired,
};

export default Payout;
