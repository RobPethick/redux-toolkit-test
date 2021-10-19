import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
} from './bookingGridSlice';
import styles from './BookingGrid.module.css';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { TextField } from '@mui/material';

export function BookingGrid() {

  return (
    <div>
      Booking Grid
    </div>
  );
}
