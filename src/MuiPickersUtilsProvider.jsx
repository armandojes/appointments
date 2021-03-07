/* eslint-disable react/prop-types */
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import esLocale from 'date-fns/locale/es';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'd MMM yyyy', { locale: this.locale });
  }
}

const PickersProvider = ({ children }) => (
  <MuiPickersUtilsProvider utils={LocalizedUtils} locale={esLocale}>
    {children}
  </MuiPickersUtilsProvider>
);

export default PickersProvider;
