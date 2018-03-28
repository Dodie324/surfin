import styled from "styled-components";
import { media } from "../../style";

export const ButtonContainer = styled.div`
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;

  ${media.mobile`
    padding-right: .5em;
  `}
`;

export const StyledSpan = styled.span`
  font-size: .85em;
  text-transform: uppercase;

  ${media.mobile`
    display: none;
  `}
`;