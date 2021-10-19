import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filterReducer from '../features/filters/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export enum ActionTypes {
  IMPORT_AVAILABILITY = 'IMPORT_AVAILABILITY',
  IMPORT_COUNSELLOR = 'IMPORT_COUNSELLOR',
}
