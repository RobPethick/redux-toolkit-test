import filterReducer, {
  BookingGrid,
  importAvailabilities,
  importCounsellors,
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

});
