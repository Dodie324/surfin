import styled from "styled-components";
import { media, BaseLayout, BaseListStyle } from "../../style";

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

export const AuthorVideosContainer = styled.div`
  ${BaseListStyle} border-bottom: 1px solid #ccc;

  ${media.mobile`
    padding-top: 0;
  `};
`;
