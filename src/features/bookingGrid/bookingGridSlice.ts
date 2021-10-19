import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk, ActionTypes } from '../../app/store';

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

export const { importAvailabilities, importCounsellors} = bookingGridSlice.actions;


export default bookingGridSlice.reducer;
