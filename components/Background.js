import { createGlobalStyle } from "styled-components";

export const Background = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ::selection {
    background: ${(props) => props.theme.colors.background};
  }
  ::-moz-selection {
    background: ${(props) => props.theme.colors.background};
  }

`;
