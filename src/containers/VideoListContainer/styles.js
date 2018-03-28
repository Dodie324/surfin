import styled from "styled-components";
import { BaseMessageStyle } from "../../style";

export const StyledMessage = styled.div`
  ${BaseMessageStyle} padding-top: 2em;
`;

export const NoResults = styled.div`
  align-items: center;
  background-color: #eef1f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4em;
`;

export const Text = styled.h2`
  text-transform: uppercase;
`;

export const Dab = styled.img`
  height: 400px;
  width: 400px;
`;
