import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { DateTime } from 'luxon';

export interface FilterState {
  date: string;
}

const initialState: FilterState = {
  date: DateTime.now().startOf('day').toISODate(),
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
  },
});

export const { setDateFilter } = filterSlice.actions;

export const selectDateFilter = (state: RootState) => state.filter.date;


export default filterSlice.reducer;
