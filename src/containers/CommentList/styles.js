import styled from "styled-components";
import { media, BaseLayout, BaseMessageStyle } from "../../style";

export const StyledMessage = styled.div`
  ${BaseLayout} ${BaseMessageStyle};
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
