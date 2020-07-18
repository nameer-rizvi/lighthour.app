import { motion } from "framer-motion";
import styled from "styled-components";
import { space, layout } from "styled-system";

export const Input = styled(motion.input)`
  border: 4px solid ${(props) => props.theme.colors.text};
  background: transparent;
  padding: 20px;
  font-size: 2rem;
  font-family: system-ui, serif;
  font-weight: bold;
  box-sizing: border-box;
  ${space}
  ${layout}

  &:focus {
    outline: 4px solid white;
    outline-offset: 2px;
  }

  ::selection {
    background: #fff;
  }
  ::-moz-selection {
    background: #fff;
  }
`;
