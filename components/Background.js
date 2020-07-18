import { createGlobalStyle } from "styled-components";

export const Background = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
  }
`;
