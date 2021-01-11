import styled, { css } from 'styled-components';

interface StyledCustomProps {
  middle?: boolean
}

const StyledRow = styled.div<StyledCustomProps>`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    ${({ middle }) => {
  return middle && css`align-items: center;`;
}}
`;

export default StyledRow;
