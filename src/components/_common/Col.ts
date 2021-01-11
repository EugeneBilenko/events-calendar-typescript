import styled, { css } from 'styled-components';

interface StyledColProps {
  readonly align?: 'start' | 'center' | 'end'
}

const StyledCol = styled.div<StyledColProps>`
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
    
    ${({ align }) => {
      switch (align) {
        case 'start':
          return css`
              justify-content: flex-start;
              text-align: left;
          `;
        case 'center':
          return css`
              justify-content: center;
              text-align: center;
          `;
        case 'end':
          return css`
              justify-content: flex-end;
              text-align: right;
          `;
        default:
          return null;
      }
    }
  }
`;

export default StyledCol;
