import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';
import { EventItemStored } from './store/eventsSlice';

export interface CalendarDisplayData {
  currentMonth: string,
  selectedDate: string,
  monthStart: string,
  monthEnd: string,
  startDate: string,
  endDate: string,
}

export function getCalendarDisplayData(month = new Date().toString()): CalendarDisplayData {
  const currentMonth = month;
  const selectedDate = new Date();
  const monthStart = startOfMonth(new Date(currentMonth));
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd);
  return {
    currentMonth,
    selectedDate: selectedDate.toString(),
    monthStart: monthStart.toString(),
    monthEnd: monthEnd.toString(),
    startDate: startDate.toString(),
    endDate: endDate.toString(),
  };
}

export function formatTime(time: Date, formatStr = "hh:mm:aa") {

  return format(time, formatStr, { weekStartsOn: 1 });
}

export function formatDate(date: Date, formatStr: string) {
  return format(date, formatStr, { weekStartsOn: 1 });
}

export function sortEventsByDate(a: EventItemStored, b: EventItemStored) {
  const date1 = +a.time;
  const date2 = +b.time;
  if (date1 < date2) {
    return -1;
  }
  if (date1 > date2) {
    return 1;
  }
  return 0;
}
