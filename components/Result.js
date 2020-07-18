import styled from "styled-components";
import { space } from "styled-system";
import { H1, H2 } from "./Headlines";

export const Result = styled.section`
  display: flex;
  flex-direction: column;
  outline: 4px solid ${(props) => props.theme.colors.text};
  outline-offset: 4px;
  background-color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.background} !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: space-between;
  min-height: 300px;
  max-width: 300px;

  h1,
  h2 {
    color: ${(props) => props.theme.colors.background} !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ${space}

  ::selection {
    background: ${(props) => props.theme.colors.background};
  }
  ::-moz-selection {
    background: ${(props) => props.theme.colors.background};
  }
`;
