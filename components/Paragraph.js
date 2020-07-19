import styled from "styled-components";
import { typography, color, space } from "styled-system";

export const Paragraph = styled.p`
  ${typography}
  ${space}
  ${color}

  a {
    ${color}
  }

  a:focus {
    outline: 4px solid white;
    outline-offset: 2px;
  }

`;
