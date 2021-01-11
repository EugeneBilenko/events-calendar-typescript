import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { startOfDay } from 'date-fns';
import { sortEventsByDate } from '../helpers';

export interface EventItemStored {
  id: number;
  time: string;
  color: string;
  text: string;
}


export interface EventItemToDisplay extends Omit<EventItemStored, 'time'> {
  time: Date;
}

export interface NewEvent extends Omit<EventItemToDisplay, 'id'> {
  id: number | null;
  time: Date;
}
export interface NewEventToStore extends Omit<NewEvent, 'time'> {
  time: string;
}

export type EventItemsListStored = EventItemStored[];
export type EventItemsListToDisplay = EventItemToDisplay[];

interface EventsState {
  items: EventItemsListStored;
  selectedEvent: EventItemStored | null;
}

interface EventsMap {
  [ key: string ]: EventItemsListStored
}

const events: EventItemsListStored = [
  {
    id: 0,
    time: new Date().toString(),
    color: 'green',
    text: 'Do coding Challenge',
  },
];

const initialState: EventsState = {
  items: events,
  selectedEvent: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addNewEvent: (state, action: PayloadAction<NewEventToStore>) => {
      const lastItem = state.items[ state.items.length - 1 ];
      const lastItemId = lastItem ? lastItem.id + 1 : 0;
      state.items.push({
        ...action.payload,
        id: lastItemId,
        time: action.payload.time,
      });
    },
    editEvent: (state, action: PayloadAction<NewEventToStore>) => {
      state.items = state.items.map(item =>
        item.id === action.payload.id
          ? { ...action.payload, time: action.payload.time } as EventItemStored
          : item,
      );
    },
    selectEvent: (state, action: PayloadAction<EventItemToDisplay>) => {
      state.selectedEvent = { ...action.payload, time: action.payload.time.toString() };
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});


const selectEventsState = (state: RootState) => state.events;
const selectSelectedDay = (state: RootState) => state.calendar.selectedDay;
const selectEventsItems = createSelector(
  selectEventsState,
  (events) => events.items,
);
export const selectSelectedEvent = createSelector(
  selectEventsState,
  (events) => events.selectedEvent,
);
export const selectEventsByDay = createSelector(
  selectEventsItems,
  (events) => {
    const eventsMap: EventsMap = {};
    events.forEach(event => {
      const eventDayStart = +startOfDay(new Date(event.time));
      if (eventsMap[ eventDayStart ]) {
        eventsMap[ eventDayStart ].push(event);
        eventsMap[ eventDayStart ].sort(sortEventsByDate);
      } else {
        eventsMap[ eventDayStart ] = [ event ];
      }
    });
    return eventsMap;
  },
);
export const selectSelectedDayEvents = createSelector(
  selectEventsByDay,
  selectSelectedDay,
  (events, selectedDay): EventItemsListToDisplay => {
    const selectedDayEvents = (selectedDay && events[ +startOfDay(new Date(selectedDay)) ]) || [];
    return selectedDayEvents.map((item: EventItemStored) => {
      return { ...item, time: new Date(item.time) } as EventItemToDisplay;
    });
  },
);

export const { addNewEvent, editEvent, deleteEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
