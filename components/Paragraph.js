import styled from "styled-components";
import { typography, color, space } from "styled-system";

export const Paragraph = styled.p`
  ${typography}
  ${space}
  ${color}

  a {
    color: ${(props) => props.theme.colors.text};
  }

  a:focus {
    outline: 4px solid white;
    outline-offset: 2px;
  }

`;
