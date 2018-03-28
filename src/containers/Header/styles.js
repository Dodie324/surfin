import styled from "styled-components";
import { media } from "../../style";

export const HeaderContainer = styled.div`
  background-color: #24292e;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 0 2em;
  position: fixed;
  width: 100%;

  ${media.mobile`
    padding: 0 1em;
  `};
`;

export const LogoContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 1;
  margin-left: 1em;

  ${media.mobile`
    margin-left: 0;
  `};
`;

export const Logo = styled.img`
  height: 30px;
`;

export const Title = styled.h1`
  color: #fff;
  font-weight: bold;
  margin: 0;

  ${media.mobile`
    font-size: 1em;
  `};
`;
