import styled, { css } from 'styled-components';
import Col from './Col';
import { colors } from '../../global-styles';
interface StyledProps {
  selected: boolean;
  disabled: boolean;
}
const StyledCell = styled(Col)<StyledProps>`
    position: relative;
    height: 7em;
    border-right: 1px solid ${colors.borderColor};
    overflow: auto;
    cursor: pointer;
    background: ${colors.white};
    transition: 0.25s ease-out;
    &:hover{
        background: ${colors.bg};
        transition: 0.5s ease-out;
    }
    .number{
        position: absolute;
        font-size: 82.5%;
        line-height: 1;
        top: 0;
        right: 0;
    }
    ${({ selected }) => selected && css`
        border-left: 10px solid #1a8fff;
    `}
    ${({disabled}) => disabled && css`
        color: ${colors.textLight};
        pointer-events: none;
    `}
`;

export default StyledCell;
