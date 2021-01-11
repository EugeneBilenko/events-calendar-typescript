import styled from 'styled-components';
import { DropdownItem, ListGroupItem } from 'reactstrap';

export const StyledColorDropdownItem = styled(DropdownItem)`
  &&& {
      height: 25px;
      background-color: ${({ color }) => color};
      cursor: pointer;
  }
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  &&& {
    background-color: ${({ color }) => color};
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
