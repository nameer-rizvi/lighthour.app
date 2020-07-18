import { motion } from "framer-motion";
import styled from "styled-components";
import { space } from "styled-system";

export const Label = styled(motion.label)`
  font-size: 1rem;
  font-family: system-ui, sans-serif;
  font-weight: bold;
  letter-spacing: 2px;
  ${space}

  ::selection {
    background: #fff;
  }
  ::-moz-selection {
    background: #fff;
  }
`;
