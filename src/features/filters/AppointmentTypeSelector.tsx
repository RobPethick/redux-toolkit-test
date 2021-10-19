import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectSelectedAppointmentTypes, setAppointmentTypesFilter } from './filterSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { selectAvailableAppointmentTypes } from '../bookingGrid/bookingGridSlice';

export function AppointmentTypeSelector() {
  const availableAppointmentTypes = useAppSelector(selectAvailableAppointmentTypes);
  const selectedAppointmentTypes = useAppSelector(selectSelectedAppointmentTypes);

  const dispatch = useAppDispatch()
  return (
    <FormControl sx={{ m: 1, width: 150 }}>
      <InputLabel>Appointment Types</InputLabel>
      <Select
        value={selectedAppointmentTypes}
        onChange={(selectedAppointmentTypes) => dispatch(setAppointmentTypesFilter(selectedAppointmentTypes.target.value as string[]))}
        autoWidth
        multiple
        label="Appointment Types"
      >
        {
          availableAppointmentTypes.map((AppointmentType) => <MenuItem value={AppointmentType}>{AppointmentType}</MenuItem>)
        }
      </Select>
    </FormControl>
  );
}
