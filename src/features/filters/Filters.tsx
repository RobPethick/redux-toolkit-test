import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectDateFilter, setDateFilter } from './filterSlice';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { FormControl, TextField } from '@mui/material';
import TimePicker from '@mui/lab/TimePicker';
import { SpecialismSelector } from './SpecialismSelector';

export function Filters() {
  const dispatch = useAppDispatch();
  const dateValue = useAppSelector(selectDateFilter)
  return (
    <div>
      <FormControl sx={{ m: 1}}>
        <MobileDatePicker
          label="Date"
          inputFormat="dd/MM/yyyy"
          value={dateValue}
          onChange={(event) => dispatch(setDateFilter(event))}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>
      <FormControl sx={{ m: 1}}>
        <TimePicker
          label="Time"
          value={dateValue}
          onChange={(event) => dispatch(setDateFilter(event))}
          renderInput={(params) => <TextField {...params} />}
          minutesStep={60}
        />
      </FormControl>
      <SpecialismSelector />
    </div>
  );
}
