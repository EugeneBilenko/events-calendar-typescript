import React, { MouseEventHandler } from 'react';
import { ListGroup, ButtonGroup, Button, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';
import { formatTime } from '../../helpers';
import { StyledListGroupItem } from './styled';
import { EventItemsListToDisplay } from '../../store/eventsSlice';

interface IProps {
  events: EventItemsListToDisplay;
  onDeleteEvent: Function
  onEditEvent: Function
  onHideModal: MouseEventHandler
  onShowEventForm: MouseEventHandler
}

const DayEventsList = ({ events, onDeleteEvent, onEditEvent, onHideModal, onShowEventForm }: IProps) => {
  return (
    <React.Fragment>
      <ModalHeader toggle={onHideModal}>Events list</ModalHeader>
      <ModalBody size="lg">
        {!events || events.length === 0
          ? <h3>No events for this days yet</h3>
          : <ListGroup>
            {events.map(event => (
                <StyledListGroupItem color={event.color} key={event.id}>
                  <div>{formatTime(event.time)} - {event.text}</div>
                  <ButtonGroup size="sm">
                    <Button color="primary" onClick={() => onEditEvent(event)}>Edit</Button>
                    <Button color="danger" onClick={() => onDeleteEvent(event.id)}>Delete</Button>
                  </ButtonGroup>
                </StyledListGroupItem>
              ),
            )}
          </ListGroup>
        }
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={onShowEventForm}
        >
          AddEvent
        </Button>
        {' '}
        <Button color="secondary" onClick={onHideModal}>Cancel</Button>
      </ModalFooter>

    </React.Fragment>
  );
};

export default DayEventsList;
