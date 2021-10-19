import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FilterState {
  date: string;
  specialisms: string[];
  appointment_mediums: string[];
  appointment_types: string[];
}

const initialState: FilterState = {
  date: '2021-07-25T00:00:00.000Z',
  specialisms: [],
  appointment_mediums: [],
  appointment_types: [],
};


export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDateFilter: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.date = action.payload;
      }
    },
    setSpecialismsFilter: (state, action: PayloadAction<string[]>) => {
      state.specialisms = action.payload;
    },
    setAppointmentTypesFilter: (state, action: PayloadAction<string[]>) => {
      state.appointment_types = action.payload;
    },
    setAppointmentMediumsFilter: (state, action: PayloadAction<string[]>) => {
      state.appointment_mediums = action.payload;
    },
  },
});

export const { setDateFilter, setSpecialismsFilter, setAppointmentTypesFilter, setAppointmentMediumsFilter } = filterSlice.actions;

export const selectDateFilter = (state: RootState) => state.filter.date;
export const selectSelectedSpecialisms = (state: RootState) => state.filter.specialisms;
export const selectSelectedAppointmentTypes = (state: RootState) => state.filter.appointment_types;
export const selectSelectedAppointmentMediums = (state: RootState) => state.filter.appointment_mediums;


export default filterSlice.reducer;
