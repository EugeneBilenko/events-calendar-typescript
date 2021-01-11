import styled from 'styled-components';
import { colors } from '../../global-styles';
import Row from '../_common/Row';
import Cell from '../_common/Cell';

export const StyledCalendar = styled.div`
    display: block;
    position: relative;
    width: 100%;
    background: ${colors.white};
    border: 1px solid ${colors.borderColor};
`;

export const StyledDaysGrid = styled.div`
    ${Row} {
        border-bottom: 1px solid ${colors.borderColor};
        &:last-child{
            border-bottom: none;
        }
    }
    ${Cell} {
        flex-grow: 0;
        flex-basis: calc(100% / 7);
        width: calc(100% / 7);
        &:last-child{
            border-right: none;
        }
    }
`;

export const StyledEvents = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 5px;
`;
export const StyledEventItem = styled.div`
    flex: 1;
    background-color: ${({ color }) => color};
    color: ${colors.white};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.75rem;
    border-radius: 4px;
    border: 1px solid ${colors.borderColor};
`;

export const StyledHeader = styled(Row)`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 115%;
    padding: 1.5em 0;
    border-bottom: 1px solid ${colors.borderColor};
    .arrow{
        padding: 10px;
        width: 40px;
        display: inline-block;
        cursor: pointer;
    }
    .icon {
        cursor: pointer;
        transition: 0.15s ease-out;
        &:hover {
            transform: scale(1.75);
            transition: 0.25s ease-out;
            color: var(--main-color);
        }
        &:first-of-type {
            margin-left: 1em;
        }
        &:last-of-type {
            margin-right: 1em;
        }
    }
`;
export const StyledDaysLabels = styled(Row)`
    text-transform: uppercase;
    font-weight: 400;
    color: ${colors.textLight};
    font-size: 70%;
    padding: 0.75em 0;
    border-bottom: 1px solid ${colors.borderColor};
`;
