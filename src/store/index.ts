import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import eventsReducer from './eventsSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    events: eventsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
