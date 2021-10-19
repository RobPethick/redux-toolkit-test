import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectSelectedSpecialisms, setSpecialismsFilter } from './filterSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { selectAvailableSpecialisms } from '../bookingGrid/bookingGridSlice';

export function SpecialismSelector() {
  const availableSpecialisms = useAppSelector(selectAvailableSpecialisms);
  const selectedSpecialisms = useAppSelector(selectSelectedSpecialisms);

  const dispatch = useAppDispatch()
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel>Specialisms</InputLabel>
      <Select
        value={selectedSpecialisms}
        onChange={(selectedSpecialisms) => dispatch(setSpecialismsFilter(selectedSpecialisms.target.value as string[]))}
        autoWidth
        multiple
        label="Specialisms"
      >
        {
          availableSpecialisms.map((specialism) => <MenuItem value={specialism}>{specialism}</MenuItem>)
        }
      </Select>
    </FormControl>
  );
}
