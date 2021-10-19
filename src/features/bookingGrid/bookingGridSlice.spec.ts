import { RootState } from '../../app/store';
import filterReducer, {
  BookingGrid,
  importAvailabilities,
  selectAvailableSpecialisms,
  selectFilteredCounsellors,
  selectCurrentAvailabilities,
} from './bookingGridSlice';

describe('filter reducer', () => {
  const initialState: BookingGrid = {
    availabilities: {},
    counsellors: [],
  };
  it('should handle initial state', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle importAvailabilities', () => {
    const availabilities = {
      'counsellorId': [
        {
          id: 'avaiabilityId',
          datetime: '2021-10-19T16:42:00.000'
        }
      ]
    }
    const actual = filterReducer(initialState, importAvailabilities(availabilities));
    expect(actual.availabilities).toEqual(availabilities);
  });

  it('should correctly select current availabilities', () => {
    const selectedDate = '2021-10-20T00:00:00.000Z'
    const rootState: RootState = {
      filter: {
        date: selectedDate,
        specialisms: [],
        appointment_mediums: [],
        appointment_types: [],
      },
      bookingGrid: {
        availabilities: {

          'counsellorId': [
            {
              id: 'correctDayId1',
              datetime: '2021-10-20T16:42:00.000Z'
            },
            {
              id: 'wrongDayId1',
              datetime: '2021-10-10T16:42:00.000Z'
            },
            {
              id: 'correctDayId2',
              datetime: '2021-10-20T16:00:00.000Z'
            },
            {
              id: 'wrongDayId2',
              datetime: '2021-10-10T16:22:00.000Z'
            },
          ]
        },
        counsellors: []
      }
    };

    const selectedAvailabilities = selectCurrentAvailabilities(rootState);

    expect(selectedAvailabilities['counsellorId'].length).toEqual(2);
    expect(selectedAvailabilities['counsellorId'].every((availability) => availability.id.includes('correctDayId'))).toBeTruthy();
    expect(selectedAvailabilities['counsellorId'].some((availability) => availability.id.includes('wrongtDayId'))).toBeFalsy();
  });

  it('should correctly return available counsellors', () => {
    const selectedDate = '2021-10-20T00:00:00.000Z'
    const rootState: RootState = {
      filter: {
        date: selectedDate,
        specialisms: [],
        appointment_mediums: [],
        appointment_types: [],
      },
      bookingGrid: {
        availabilities: {

          'unavailableCounsellorId': [
            {
              id: 'wrongDayId1',
              datetime: '2021-10-10T16:42:00.000Z'
            },
            {
              id: 'wrongDayId2',
              datetime: '2021-10-10T16:42:00.000Z'
            },
          ],

          'availableCounsellorId': [
            {
              id: 'correctDayId1',
              datetime: '2021-10-20T16:42:00.000Z'
            },
            {
              id: 'wrongDayId1',
              datetime: '2021-10-10T16:42:00.000Z'
            },
            {
              id: 'correctDayId2',
              datetime: '2021-10-20T16:42:00.000Z'
            },
            {
              id: 'wrongDayId2',
              datetime: '2021-10-10T16:42:00.000Z'
            },
          ]
        },
        counsellors: [
          {
            id: 'unavailableCounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'Unavailable',
            lastName: 'Counsellor',
            specialisms: []
          },
          {
            id: 'availableCounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'Available',
            lastName: 'Counsellor',
            specialisms: []
          }
        ]
      }
    };

    const selectedCounsellors = selectFilteredCounsellors(rootState);

    expect(selectedCounsellors.length).toEqual(1);
    expect(selectedCounsellors[0].id).toBe('availableCounsellorId');
  });

  it('should sort availabilities', () => {
    const selectedDate = '2021-10-20T00:00:00.000Z'
    const rootState: RootState = {
      filter: {
        date: selectedDate,
        specialisms: [],
        appointment_mediums: [],
        appointment_types: [],
      },
      bookingGrid: {
        availabilities: {

          'unavailableCounsellorId': [
            {
              id: 'wrongDayId1',
              datetime: '2021-10-10T16:42:00.000Z'
            },
            {
              id: 'wrongDayId2',
              datetime: '2021-10-10T16:42:00.000Z'
            },
          ],

          'availableCounsellorId': [
            {
              id: 'secondTimeslotId',
              datetime: '2021-10-20T20:00:00.000Z'
            },
            {
              id: 'wrongDayId1',
              datetime: '2021-10-10T16:42:00.000Z'
            },
            {
              id: 'firstTimeslotId',
              datetime: '2021-10-20T15:00:00.000Z'
            },
            {
              id: 'wrongDayId2',
              datetime: '2021-10-10T16:42:00.000Z'
            },
          ]
        },
        counsellors: [
          {
            id: 'unavailableCounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'Unavailable',
            lastName: 'Counsellor',
            specialisms: []
          },
          {
            id: 'availableCounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'Available',
            lastName: 'Counsellor',
            specialisms: []
          }
        ]
      }
    };

    const selectedCounsellors = selectFilteredCounsellors(rootState);

    expect(selectedCounsellors[0].availabilities[0].id).toBe('firstTimeslotId');
    expect(selectedCounsellors[0].availabilities[1].id).toBe('secondTimeslotId');
  });

  it('should remove duplicate availabilities', () => {
    const selectedDate = '2021-10-20T00:00:00.000Z'
    const rootState: RootState = {
      filter: {
        date: selectedDate,
        specialisms: [],
        appointment_mediums: [],
        appointment_types: [],
      },
      bookingGrid: {
        availabilities: {

          'unavailableCounsellorId': [
            {
              id: 'wrongDayId1',
              datetime: '2021-10-10T16:42:00.000Z'
            },
            {
              id: 'wrongDayId2',
              datetime: '2021-10-10T16:42:00.000Z'
            },
          ],

          'availableCounsellorId': [
            {
              id: 'timeslotId',
              datetime: '2021-10-20T20:00:00.000Z'
            },
            {
              id: 'wrongDayId1',
              datetime: '2021-10-10T16:42:00.000Z'
            },
            {
              id: 'duplicateTimeslotId',
              datetime: '2021-10-20T20:00:00.000Z'
            },
            {
              id: 'anotherDuplicateTimeslotId',
              datetime: '2021-10-20T20:00:00.000Z'
            },
            {
              id: 'wrongDayId2',
              datetime: '2021-10-10T16:42:00.000Z'
            },
          ]
        },
        counsellors: [
          {
            id: 'unavailableCounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'Unavailable',
            lastName: 'Counsellor',
            specialisms: []
          },
          {
            id: 'availableCounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'Available',
            lastName: 'Counsellor',
            specialisms: []
          }
        ]
      }
    };

    const selectedCounsellors = selectFilteredCounsellors(rootState);

    expect(selectedCounsellors[0].availabilities.length).toBe(1);
  });


  it('should correctly return available specialisms', () => {
    const state: RootState = {
      bookingGrid: {
        availabilities: {},
        counsellors: [
          {
            id: 'EDspecialismcounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'ED',
            lastName: 'Counsellor',
            specialisms: [
              'Eating disorders'
            ]
          },
          {
            id: 'ADHDspecialismcounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'Available',
            lastName: 'Counsellor',
            specialisms: ['ADHD']
          }
        ]
      },
      filter: {
        date: '2020-10-20T10:00:00',
        specialisms: [],
        appointment_mediums: [],
        appointment_types: [],
      }
    }

    const availableSpecialisms = selectAvailableSpecialisms(state);
    expect(availableSpecialisms).toContain('ADHD');
    expect(availableSpecialisms).toContain('Eating disorders');
  });

  it('should not return duplicate specialisms', () => {
    const state: RootState = {
      bookingGrid: {
        availabilities: {},
        counsellors: [
          {
            id: 'EDspecialismcounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'ED',
            lastName: 'Counsellor',
            specialisms: [
              'Eating disorders',
              'ADHD'
            ]
          },
          {
            id: 'ADHDspecialismcounsellorId',
            appointment_mediums: [],
            appointment_types: [],
            firstName: 'Available',
            lastName: 'Counsellor',
            specialisms: ['ADHD']
          }
        ]
      },
      filter: {
        date: '2020-10-20T10:00:00',
        specialisms: [],
        appointment_mediums: [],
        appointment_types: [],
      }
    }

    const availableSpecialisms = selectAvailableSpecialisms(state);
    expect(availableSpecialisms.length).toEqual(2);
  });
});
