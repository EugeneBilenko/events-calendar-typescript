import { createSlice, PayloadAction, createSelector, CaseReducer } from '@reduxjs/toolkit';
import { RootState } from './index';
import { startOfWeek, isSameMonth, isSameDay, startOfDay, addDays } from 'date-fns';
import { CalendarDisplayData, formatDate, getCalendarDisplayData } from '../helpers';
import { selectEventsByDay, EventItemsListToDisplay } from './eventsSlice';

interface CalendarState extends CalendarDisplayData {
  selectedDay: string | null
}

export interface DayDisplayItem {
  day: Date;
  formattedDate: string;
  disabled: boolean;
  selected: boolean;
  events: EventItemsListToDisplay
}

const initialState: CalendarState = {
  ...getCalendarDisplayData(),
  selectedDay: null,
};

function nextPrevMonthReducer(state: CalendarState, action: PayloadAction<string>) {
  return {
    ...state,
    ...getCalendarDisplayData(action.payload),
  };
}

function reducerWithPrepareFactory(reducerFn: CaseReducer<any, PayloadAction<string>>) {
  return {
    reducer: reducerFn,
    prepare: (date: Date) => {
      return { payload: date.toString() };
    },
  };
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDay: reducerWithPrepareFactory((state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    }),
    clearSelectedDay: state => {
      state.selectedDay = null;
    },
    nextMonth: reducerWithPrepareFactory(nextPrevMonthReducer),
    prevMonth: reducerWithPrepareFactory(nextPrevMonthReducer),
  },
});


const selectCalendarState = (state: RootState) => state.calendar;

export const selectSelectedDay = createSelector(
  selectCalendarState,
  (calendar): Date | null => calendar.selectedDay ? new Date(calendar.selectedDay) : null,
);
export const selectCurrentMonth = createSelector(
  selectCalendarState,
  (calendar) => new Date(calendar.currentMonth),
);
export const selectMonthToDisplay = createSelector(
  selectCalendarState,
  (calendar) => formatDate(new Date(calendar.currentMonth), "MMMM yyyy"),
);
export const selectWeekDaysToDisplay = createSelector(
  selectCurrentMonth,
  (currentMonth) => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        formatDate(addDays(startDate, i), "EEEE"),
      );
    }
    return days;
  },
);
export const selectCalendarDaysToDisplay = createSelector(
  selectCalendarState,
  selectEventsByDay,
  ({ currentMonth, selectedDate, monthStart, monthEnd, startDate, endDate }, events) => {
    const rows: Array<Array<DayDisplayItem>> = [];
    let days: DayDisplayItem[] = [];
    let day: Date = new Date(startDate);
    const _endDate = new Date(endDate);
    const _monthStart = new Date(monthStart);
    const _selectedDate = new Date(selectedDate);
    let formattedDate = "";
    while (day <= _endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = formatDate(day, "d");
        days.push({
          day,
          formattedDate,
          disabled: !isSameMonth(day, _monthStart),
          selected: isSameDay(day, _selectedDate),
          events: (events[ +startOfDay(day) ] || []).map(item => ({ ...item, time: new Date(item.time) })),
        });
        day = addDays(day, 1);
      }
      rows.push(days);
      days = [];
    }
    return rows;
  },
);

export const { setSelectedDay, clearSelectedDay, nextMonth, prevMonth } = calendarSlice.actions;

export default calendarSlice.reducer;
