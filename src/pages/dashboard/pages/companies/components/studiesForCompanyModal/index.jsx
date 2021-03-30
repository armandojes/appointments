/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { bool, func } from 'prop-types';
import React from 'react';
import Modal from 'src/components/modal';

const StudiesForCompanyModal = ({ open, onClose }) => {
  return (
    <Modal open={open}>
      hello
    </Modal>
  );
};

StudiesForCompanyModal.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
};

export default StudiesForCompanyModal;
