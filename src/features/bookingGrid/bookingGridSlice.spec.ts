import { RootState } from '../../app/store';
import filterReducer, {
  BookingGrid,
  importAvailabilities,
  importCounsellors,
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
      filter: { date: selectedDate },
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
              datetime: '2021-10-20T16:42:00.000Z'
            },
            {
              id: 'wrongDayId2',
              datetime: '2021-10-10T16:42:00.000Z'
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

});
