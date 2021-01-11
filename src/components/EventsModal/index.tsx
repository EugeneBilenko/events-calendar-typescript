import React from 'react';
import { Modal } from 'reactstrap';
import EventForm from './EventForm';
import DayEventsList from './DayEventsList';
import useEventsModal from './useEventsModal';

const EventsModal = () => {
  const {selectedDay, selectedDayEvents, newEvent, showEventForm, actions } = useEventsModal();
  return (
    <Modal centered isOpen={!!selectedDay} toggle={actions.toggle}>
      {showEventForm
        ? <EventForm
          {...newEvent}
          onDateChange={actions.handleDateChange}
          onTextChange={actions.handleTextChange}
          onSelectColor={actions.handleSelectColor}
          onHideEventForm={actions.toggleEventForm}
          onSubmit={actions.handleSubmit}
        />
        : <DayEventsList
          onShowEventForm={actions.toggleEventForm}
          onHideModal={actions.resetSelectedDay}
          onEditEvent={actions.handleEditEvent}
          onDeleteEvent={actions.handleDeleteEvent}
          events={selectedDayEvents}
        />
      }
    </Modal>
  );
};

export default EventsModal;
