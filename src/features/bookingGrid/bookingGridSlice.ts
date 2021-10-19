import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { mapObjIndexed } from 'ramda';
import { RootState, AppThunk, ActionTypes } from '../../app/store';
import { selectDateFilter } from '../filters/filterSlice';

export interface Counsellor {
  id: string,
  firstName: string,
  lastName: string,
  appointment_types: string[],
  appointment_mediums: string[],
  specialisms: string[]
}

export interface Availability {
  id: string;
  datetime: string;
}

export interface BookingGrid {
  availabilities: { [counsellorId in string]: Availability[] };
  counsellors: Counsellor[];
}

const initialState: BookingGrid = {
  availabilities: {},
  counsellors: [],
};


export const bookingGridSlice = createSlice({
  name: 'filter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    importAvailabilities: (state, action: PayloadAction<BookingGrid['availabilities']>) => {
      state.availabilities = action.payload;
    },
    importCounsellors: (state, action: PayloadAction<Counsellor[]>) => {
      state.counsellors = action.payload;
    },
  },
});

export const { importAvailabilities, importCounsellors } = bookingGridSlice.actions;

export const selectAvailabilities = (state: RootState) => state.bookingGrid.availabilities;
export const selectCounsellors = (state: RootState) => state.bookingGrid.counsellors;
export const selectCurrentAvailabilities = createSelector(selectAvailabilities, selectDateFilter,
   (availabilities, date) => {
     const selectedDate = DateTime.fromISO(date);
    return mapObjIndexed((array) => array.filter((availability) => selectedDate.hasSame(DateTime.fromISO(availability.datetime), 'day')),availabilities);
})


export default bookingGridSlice.reducer;
