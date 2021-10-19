import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ActionTypes, store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AvailabilityData from './data/availability-mock.json';
import CounsellorData from './data/counsellor-mock.json';
import { importAvailabilities, importCounsellors } from './features/bookingGrid/bookingGridSlice';

store.dispatch(importCounsellors(CounsellorData));
store.dispatch(importAvailabilities(AvailabilityData));
ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
