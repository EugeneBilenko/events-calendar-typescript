import React from 'react';
import { StyledDaysGrid } from './styled';
import StyledRow from '../_common/Row';
import StyledCell from '../_common/Cell';
import { DayDisplayItem } from '../../store/calendarSlice';
import Events from './Events';

interface IProps {
  daysToDisplay: DayDisplayItem[][]
  onSelectDay: (day: Date) => void
}
const DaysGrid = ({ daysToDisplay, onSelectDay }: IProps) => {
  return (
    <StyledDaysGrid>
      {
        daysToDisplay.map((week, i) => (
          <StyledRow key={i}>
            {week.map(item => (
              <StyledCell
                key={item.day.toString()}
                disabled={item.disabled}
                selected={item.selected}
                onClick={() => onSelectDay(item.day)}
              >
                <span className="number">{item.formattedDate}</span>
                {item.events.length > 0 && <Events events={item.events} />}
              </StyledCell>
            ))}
          </StyledRow>
        ))
      }
    </StyledDaysGrid>
  );
};

export default DaysGrid;
