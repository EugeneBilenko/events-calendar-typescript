import React from 'react';
import { StyledEventItem, StyledEvents } from './styled';
import { formatTime } from '../../helpers';
import { EventItemsListToDisplay } from '../../store/eventsSlice';

interface IProps {
  events: EventItemsListToDisplay
}
const Events = ({ events }: IProps) => {
  return (
    <StyledEvents>
      {
        events.map((event) => (
          <StyledEventItem key={event.id} color={event.color}>
            {formatTime(event.time, "hh:mm:aa")} - {event.text}
          </StyledEventItem>
        ))
      }
    </StyledEvents>
  );
};

export default Events;
