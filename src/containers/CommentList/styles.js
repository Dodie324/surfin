import styled from "styled-components";
import { media, BaseLayout, BaseMessageStyle } from "../../style";

export const StyledMessage = styled.div`
  ${BaseLayout} ${BaseMessageStyle};
`;

export const StyledHeader = styled.h5`
  ${BaseLayout} font-style: italic;
  margin-top: 1em;

  ${media.tablet`
    margin-left: 1em;
  `};

  ${media.mobile`
    font-size: .75em;
    margin-bottom: 1em;
    text-align: center;
  `};
`;

export const CommentsContainer = styled.div`
  ${BaseLayout} margin-bottom: 1em;
  max-width: 850px;

  ${media.tablet`
    margin: 0 2em;
  `};

  ${media.mobile`
    margin: 0 1em;
  `};
`;
