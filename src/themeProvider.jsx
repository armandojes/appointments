import React from 'react';
import { createMuiTheme, ThemeProvider as ThemeProviderMaterial } from '@material-ui/core';
import { array, element, object, string, oneOfType } from 'prop-types';
import { colors } from './constants';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.green,
    },
    secondary: {
      main: colors.blue,
    },
  },
});

const ThemeProvider = ({ children }) => (
  <ThemeProviderMaterial theme={theme}>
    {children}
  </ThemeProviderMaterial>
);

ThemeProvider.propTypes = {
  children: oneOfType([string, array, object, element]).isRequired,
};

export default ThemeProvider;
