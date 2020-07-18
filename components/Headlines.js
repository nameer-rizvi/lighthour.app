import styled from "styled-components";
import { color, space, typography, layout } from "styled-system";
import { motion } from "framer-motion";

export const H1 = styled(motion.h1)`
    margin: 0;
    color: ${(props) => props.theme.colors.text};
    ${color}
    ${space}
    ${typography}
    ${layout}

    ::selection {
    background: #fff; 
    }
    ::-moz-selection {
    background: #fff; 
    }
`;

export const H2 = styled(motion.h2)`
    margin: 0;
    color: ${(props) => props.theme.colors.text};
    ${color}
    ${space}
    ${typography}
    ${layout}

    ::selection {
    background: #fff; 
    }
    ::-moz-selection {
    background: #fff; 
    }
`;
