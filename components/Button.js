import { motion } from "framer-motion";
import styled from "styled-components";
import { space, typography } from "styled-system";

export const Button = styled(motion.button)`
  font-size: 1rem;
  line-height: 1.5;
  font-family: system-ui, sans-serif;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.colors.text};
  padding: 20px 40px;
  color: ${(props) => props.theme.colors.background};
  border: 4px solid ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease-out;
  box-sizing: border-box;
  box-shadow: none;

  ${space}
  ${typography}

  &:focus {
    outline: 4px solid white;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
    background-color: #00010185;
  }
`;
