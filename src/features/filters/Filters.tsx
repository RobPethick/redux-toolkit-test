import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectDateFilter, setDateFilter } from './filterSlice';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { FormControl, TextField } from '@mui/material';
import { SpecialismSelector } from './SpecialismSelector';
import { AppointmentMediumSelector } from './AppointmentMediumSelector';
import { TimeslotSelector } from './TimeslotSelector';

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
      <SpecialismSelector />
      <TimeslotSelector />
      <AppointmentMediumSelector />
    </div>
  );
}
