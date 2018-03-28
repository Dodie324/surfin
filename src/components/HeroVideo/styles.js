import styled from "styled-components";

import { media } from "../../style";

export const HeroContainer = styled.div`
  align-items: center;
  background-color: black;
  display: flex;
  flex-direction: column;
  padding-top: 6em;

  ${media.mobile`
    padding-top: 4em;
  `};
`;

export const Iframe = styled.iframe`
  border-width: 0;
  height: 350px;
  width: 50%;

  ${media.tablet`
    height: 275px;
    width: 75%;
  `};

  ${media.mobile`
    height: 210px;
    width: 100%;
  `};
`;

export const StyledH2 = styled.h2`
  color: white;
  font-weight: lighter;
  margin-bottom: 1em;
  text-align: center;

  ${media.mobile`
    font-size: 1em;
    padding: 0 4em;
  `};
`;
