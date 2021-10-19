import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FilterState {
  date: string;
  specialisms: string[];
}

const initialState: FilterState = {
  date: '2021-07-25T00:00:00.000Z',
  specialisms: [],
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
  },
});

export const { setDateFilter, setSpecialismsFilter } = filterSlice.actions;

export const selectDateFilter = (state: RootState) => state.filter.date;
export const selectSelectedSpecialisms = (state: RootState) => state.filter.specialisms;


export default filterSlice.reducer;
