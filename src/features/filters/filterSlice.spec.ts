import filterReducer, {
  FilterState,
  increment,
  decrement,
  incrementByAmount,
} from './filterSlice';

describe('filter reducer', () => {
  const initialState: FilterState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = filterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = filterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = filterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
