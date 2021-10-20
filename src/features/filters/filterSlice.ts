import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FilterState {
  date: string;
  time: string | undefined;
  specialisms: string[];
  appointment_mediums: string[];
  appointment_type: 'one_off' | 'consultation';
}

const initialState: FilterState = {
  date: '2021-07-25T00:00:00.000Z',
  time: undefined,
  specialisms: [],
  appointment_mediums: [],
  appointment_type: 'one_off',
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
    setAppointmentTypeFilter: (state, action: PayloadAction<'one_off' | 'consultation'>) => {
      state.appointment_type = action.payload;
    },
    setAppointmentMediumsFilter: (state, action: PayloadAction<string[]>) => {
      state.appointment_mediums = action.payload;
    },
    setTimeslotFilter: (state, action: PayloadAction<string | undefined>) => {
      state.time = action.payload;
    },
  },
});

export const { setDateFilter, setSpecialismsFilter, setAppointmentTypeFilter, setAppointmentMediumsFilter, setTimeslotFilter } = filterSlice.actions;

export const selectDateFilter = (state: RootState) => state.filter.date;
export const selectSelectedSpecialisms = (state: RootState) => state.filter.specialisms;
export const selectSelectedAppointmentTypes = (state: RootState) => state.filter.appointment_type;
export const selectSelectedAppointmentMediums = (state: RootState) => state.filter.appointment_mediums;
export const selectSelectedTimeslot = (state: RootState) => state.filter.time;


export default filterSlice.reducer;
