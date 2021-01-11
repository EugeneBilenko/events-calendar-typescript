import React from 'react'
import { StyledHeader } from './styled';
import StyledCol from '../_common/Col';

interface IProps {
  monthToDisplay: string;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}
const Header = ({ monthToDisplay, onNextMonth, onPrevMonth }: IProps) => {
  return (
    <StyledHeader middle>
      <StyledCol align="start">
        <div className="arrow" onClick={onPrevMonth}>&lt;</div>
      </StyledCol>
      {monthToDisplay}
      <StyledCol align="end">
        <div className="arrow" onClick={onNextMonth}>&gt;</div>
      </StyledCol>
    </StyledHeader>
  );
};

export default Header;
