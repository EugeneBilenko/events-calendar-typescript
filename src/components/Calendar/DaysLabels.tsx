import React from 'react';
import { StyledDaysLabels } from './styled';
import StyledCol from '../_common/Col';

interface IProps {
  weekDaysToDisplay: string[]
}
const DaysLabels = ({ weekDaysToDisplay }: IProps) => {
  return (
    <StyledDaysLabels>
      {weekDaysToDisplay.map((day, i) => <StyledCol align={"center"} key={i}>{day}</StyledCol>)}
    </StyledDaysLabels>
  )
};

export default DaysLabels;
