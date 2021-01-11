import { createGlobalStyle } from 'styled-components'

export const colors = {
  white: '#fff',
  main: '#1a8fff',
  text: '#777',
  textLight: '#ccc',
  borderColor: '#eee',
  bg: '#f9f9f9'
};

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-size: 1em;
        font-weight: 300;
        line-height: 1.5;
        color: ${colors.text};
        background: ${colors.bg};
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyle;
