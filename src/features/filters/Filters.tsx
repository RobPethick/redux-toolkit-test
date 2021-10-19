import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
} from './filterSlice';
import styles from './Filter.module.css';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { TextField } from '@mui/material';

export function Filters() {
  const [value, setValue] = React.useState<Date | null>(new Date('2021-08-06T11:00:00.000Z'));
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <MobileDatePicker
        label="Date"
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={(event) => setValue(event)}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
}
