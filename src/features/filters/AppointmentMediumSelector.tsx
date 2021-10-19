import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectSelectedAppointmentMediums, setAppointmentMediumsFilter } from './filterSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { selectAvailableAppointmentMediums } from '../bookingGrid/bookingGridSlice';

export function AppointmentMediumSelector() {
  const availableAppointmentMediums = useAppSelector(selectAvailableAppointmentMediums);
  const selectedAppointmentMediums = useAppSelector(selectSelectedAppointmentMediums);

  const dispatch = useAppDispatch()
  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel>Appointment Mediums</InputLabel>
      <Select
        value={selectedAppointmentMediums}
        onChange={(selectedAppointmentMediums) => dispatch(setAppointmentMediumsFilter(selectedAppointmentMediums.target.value as string[]))}
        autoWidth
        multiple
        label="Appointment Mediums"
      >
        {
          availableAppointmentMediums.map((AppointmentMedium) => <MenuItem value={AppointmentMedium}>{AppointmentMedium}</MenuItem>)
        }
      </Select>
    </FormControl>
  );
}
