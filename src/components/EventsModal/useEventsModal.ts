import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { clearSelectedDay, selectSelectedDay } from '../../store/calendarSlice';
import {
  addNewEvent, deleteEvent,
  editEvent,
  EventItemsListToDisplay, EventItemToDisplay, NewEvent,
  NewEventToStore,
  selectSelectedDayEvents,
} from '../../store/eventsSlice';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

const initialEvent: NewEvent = {
  id: null,
  text: '',
  time: new Date(),
  color: 'black',
};

const useEventsModal = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector<RootState, Date | null>(selectSelectedDay);
  const selectedDayEvents = useSelector<RootState, EventItemsListToDisplay>(selectSelectedDayEvents);
  const [ showEventForm, setShowEventForm ] = useState(false);
  const [ newEvent, setNewEvent ] = useState(initialEvent);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (newEvent.text.length > 30) {
      return;
    }
    setNewEvent({ ...newEvent, text: e.target.value });
  };
  const handleDateChange = useCallback((date: Date) => {
    setNewEvent({ ...newEvent, time: date });
  }, [setNewEvent, newEvent]);

  const handleSelectColor = (color: string) => {
    setNewEvent({ ...newEvent, color });
  };

  const resetSelectedDay = () => dispatch(clearSelectedDay());

  const toggleEventForm = () => {
    setShowEventForm(!showEventForm);
  };
  const toggle = () => {
    setShowEventForm(false);
    setNewEvent(initialEvent);
    resetSelectedDay();
  };

  const handleSubmit = () => {
    const preparedToStore: NewEventToStore = { ...newEvent, time: newEvent.time.toString() };
    if (newEvent.id !== null) {
      dispatch(editEvent(preparedToStore));
    } else {
      dispatch(addNewEvent(preparedToStore));
    }
    toggle();
  };

  const handleEditEvent = (event: EventItemToDisplay) => {
    setNewEvent(event);
    setShowEventForm(true);
  };
  const handleDeleteEvent = (eventId: number) => {
    dispatch(deleteEvent(eventId));
  };

  useEffect(() => {
    if (selectedDay) {
      handleDateChange(selectedDay);
    }
  }, [ selectedDay, handleDateChange ]);

  return {
    selectedDay,
    selectedDayEvents,
    newEvent,
    showEventForm,
    actions: {
      toggle,
      handleTextChange,
      handleDateChange,
      handleSelectColor,
      toggleEventForm,
      handleSubmit,
      handleEditEvent,
      handleDeleteEvent,
      resetSelectedDay,
    },

  };
};

export default useEventsModal;
