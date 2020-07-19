import { motion } from "framer-motion";
import styled from "styled-components";
import { space } from "styled-system";

export const Error = styled(motion.div)`
  font-size: 1rem;
  font-family: system-ui, sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 10px 20px;
  color: ${(props) => props.theme.colors.text};
  background-color: white;
  outline: 2px solid white;
  outline-offset: 2px;
  ${space}
`;
