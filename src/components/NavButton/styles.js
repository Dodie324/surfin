import styled from "styled-components";
import { media } from "../../style";

export const ButtonContainer = styled.div`
  align-items: center;
  border: 1px solid #fff;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  display: flex;
  padding: .5em;

  ${media.mobile`
    border: none;
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