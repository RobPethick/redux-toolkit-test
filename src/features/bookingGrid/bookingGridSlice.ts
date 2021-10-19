import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { mapObjIndexed, sortBy, uniq, uniqBy, where } from 'ramda';
import { RootState } from '../../app/store';
import { selectDateFilter, selectSelectedAppointmentMediums, selectSelectedAppointmentTypes, selectSelectedSpecialisms } from '../filters/filterSlice';

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
    return mapObjIndexed((array) => {
       const filteredAvailabilities = array.filter((availability) => selectedDate.hasSame(DateTime.fromISO(availability.datetime), 'day'))
       const sortedAvailabilities = sortBy((a) => a.datetime, filteredAvailabilities);
       return uniqBy((a) => a.datetime, sortedAvailabilities);
    }, availabilities);
  });

export const selectFilteredCounsellors = createSelector(
  selectCurrentAvailabilities,
  selectCounsellors,
  selectSelectedSpecialisms,
  selectSelectedAppointmentTypes,
  selectSelectedAppointmentMediums,
  (currentAvailabilities, counsellors, filteredSpecialisms, filteredAppointmentTypes, fitleredAppointmentMediums) => {
    return counsellors.map((c) => ({ ...c, availabilities: currentAvailabilities[c.id] ?? [] }))
    .filter(where({
      availabilities: (a: Availability[]) => a.length !== 0,
      specialisms: (s: string[]) => filteredSpecialisms.length === 0 || filteredSpecialisms.every((fs) => s.includes(fs)),
      appointment_types: (s: string[]) => filteredAppointmentTypes.length === 0 || filteredAppointmentTypes.every((fs) => s.includes(fs)),
      appointment_mediums: (s: string[]) => fitleredAppointmentMediums.length === 0 || fitleredAppointmentMediums.every((fs) => s.includes(fs))
    }))
  }
)

export const selectAvailableSpecialisms = createSelector(selectCounsellors, (counsellors) => uniq(counsellors.flatMap((c) => c.specialisms)));
export const selectAvailableAppointmentTypes = createSelector(selectCounsellors, (counsellors) => uniq(counsellors.flatMap((c) => c.appointment_types)));
export const selectAvailableAppointmentMediums = createSelector(selectCounsellors, (counsellors) => uniq(counsellors.flatMap((c) => c.appointment_mediums)));



export default bookingGridSlice.reducer;
