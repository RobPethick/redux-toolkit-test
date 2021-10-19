import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectDateFilter, setDateFilter } from './filterSlice';
import styles from './Filter.module.css';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { TextField } from '@mui/material';

export function Filters() {
  const dispatch = useAppDispatch();
  const dateValue = useAppSelector(selectDateFilter)
  return (
    <div>
      <MobileDatePicker
        label="Date"
        inputFormat="dd/MM/yyyy"
        value={dateValue}
        onChange={(event) => dispatch(setDateFilter(event))}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
}
