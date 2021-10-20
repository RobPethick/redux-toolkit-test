import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectSelectedTimeslot, setTimeslotFilter } from './filterSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { selectAvailableTimeslots } from '../bookingGrid/bookingGridSlice';

export function TimeslotSelector() {
  const availableTimeslots = useAppSelector(selectAvailableTimeslots);
  const selectedTimeslot = useAppSelector(selectSelectedTimeslot);

  const dispatch = useAppDispatch()
  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel>Available Timeslots</InputLabel>
      <Select
        value={selectedTimeslot}
        onChange={(selectedTimeslots) => dispatch(setTimeslotFilter(selectedTimeslots.target.value as string))}
        autoWidth
        label="Available Timeslots"
      >
        <MenuItem value={undefined}>Any time</MenuItem>
        {
          availableTimeslots.map((timeslot) => <MenuItem value={timeslot}>{timeslot}</MenuItem>)
        }
      </Select>
    </FormControl>
  );
}
