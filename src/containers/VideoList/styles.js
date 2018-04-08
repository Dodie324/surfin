import styled from "styled-components";
import { BaseLayout, BaseListStyle, BaseMessageStyle } from "../../style";
import { media } from "../../style";

export const VideoListContainer = styled.div`
  ${BaseListStyle};
  justify-content: flex-start;

  ${media.mobile`
    justify-content: flex-start;
    padding-top: 0;
  `};
`;

export const StyledMessage = styled.div`
  ${BaseLayout} ${BaseMessageStyle};
  margin: 1em auto 3em;
  max-width: 1100px;

  ${media.tablet`
    margin: 1em 2em;
  `};

  ${media.mobile`
    margin: 1em;
  `};
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
