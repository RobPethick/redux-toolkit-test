import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AvailabilityData from './data/availability-mock.json';
import CounsellorData from './data/counsellor-mock.json';
import { importAvailabilities, importCounsellors } from './features/bookingGrid/bookingGridSlice';
import { createTheme, ThemeProvider } from '@mui/material';

store.dispatch(importCounsellors(CounsellorData));
store.dispatch(importAvailabilities(AvailabilityData));
const theme = createTheme({
  palette: {
    primary: {
      main: '#35D0BA',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Provider store={store}>
          <App />
        </Provider>
      </LocalizationProvider>
    </ThemeProvider >
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
