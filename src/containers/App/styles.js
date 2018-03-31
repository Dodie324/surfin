import styled from "styled-components";
import { media, rotate360 } from "../../style";

export const Placeholder = styled.div`
  background-color: black;
  height: 519px;
  position: absolute;
  width: 100%;
  z-index: -1;

  ${media.tablet`
    height: 440px;
  `};

  ${media.mobile`
    height: 330px;
  `};
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 15%;

  ${media.mobile`
    padding-top: 35%;
  `};
`;

export const Loader = styled.img`
  animation: ${rotate360} 2s linear infinite;
  height: 100px;
  width: 100px;
`;
