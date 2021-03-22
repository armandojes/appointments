import React from 'react';
import { Collapse } from '@material-ui/core';
import { string } from 'prop-types';

const ErrorMessage = ({ message, marginBottom }) => {
  const inlineStyles = {
    backgroundColor: 'rgb(255 220 215)',
    color: '#c30202',
    padding: '.7em',
    borderRadius: '.3em',
    fontSize: '1em',
    marginBottom,
  };

  return (
    <Collapse in={!!message}>
      <div style={inlineStyles}>
        {message}
      </div>
    </Collapse>
  );
};

ErrorMessage.defaultProps = {
  marginBottom: 'none',
};

ErrorMessage.propTypes = {
  message: string.isRequired,
  marginBottom: string,
};

export default ErrorMessage;
