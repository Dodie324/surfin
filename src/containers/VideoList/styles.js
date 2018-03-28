import styled from "styled-components";
import { BaseLayout, BaseListStyle, BaseMessageStyle } from "../../style";
import { media } from "../../style";

export const VideoListContainer = styled.div`
  ${BaseListStyle};

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
