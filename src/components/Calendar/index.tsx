import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DaysLabels from './DaysLabels';
import Header from './Header';
import DaysGrid from './DaysGrid';
import {
  setSelectedDay, selectCalendarDaysToDisplay, selectCurrentMonth, selectMonthToDisplay, selectWeekDaysToDisplay,
  nextMonth, prevMonth,
} from '../../store/calendarSlice';
import { StyledCalendar } from './styled';
import { addMonths, subMonths } from 'date-fns';


const Calendar = () => {
  const dispatch = useDispatch();

  const currentMonth = useSelector(selectCurrentMonth);
  const monthToDisplay = useSelector(selectMonthToDisplay);
  const weekDaysToDisplay = useSelector(selectWeekDaysToDisplay);
  const daysToDisplay = useSelector(selectCalendarDaysToDisplay);
  const handleSelectDay = (day: Date) => {
    dispatch(setSelectedDay(day));
  };
  const handlePrevMonthClick = () => {
    const newValue = subMonths(currentMonth, 1);
    dispatch(prevMonth(newValue));
  };

  const handleNextMonthClick = () => {
    const newValue = addMonths(currentMonth, 1);
    dispatch(nextMonth(newValue));
  };
  return (
    <StyledCalendar>
      <Header onNextMonth={handleNextMonthClick} onPrevMonth={handlePrevMonthClick} monthToDisplay={monthToDisplay} />
      <DaysLabels weekDaysToDisplay={weekDaysToDisplay} />
      <DaysGrid
        daysToDisplay={daysToDisplay}
        onSelectDay={handleSelectDay}
      />
    </StyledCalendar>
  );
};


export default Calendar;
