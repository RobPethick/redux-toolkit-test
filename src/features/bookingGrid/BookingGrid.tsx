import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCounsellorsWithCurrentAvailabilities } from './bookingGridSlice';
import styles from './BookingGrid.module.css';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { TextField } from '@mui/material';
import { Counsellor } from './Counsellor';

export function BookingGrid() {
  const availableCounsellors = useAppSelector(selectCounsellorsWithCurrentAvailabilities);
  return (
    <div>
      {
        availableCounsellors.map((counsellor) => <Counsellor counsellor={counsellor}/>)
      }
    </div>
  );
}
