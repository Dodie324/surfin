import styled, { css } from "styled-components";
import { ThumbsUp as ThumbsUpIcon } from "react-feather";
import { media } from "../../style";


const Margin = css`
  margin: 0.25em 0;
`;

export const CommentListItemContainer = styled.article`
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 1em 0;

  ${media.mobile`
    padding: 1em;
  `}
`;

export const AvatarContainer = styled.div`
  justify-content: center;
  margin-right: 2em;
`;

export const Img = styled.img`
  border-radius: 50%;
`;

export const ContentContainer = styled.div`
  flex-direction: column;
  justify-content: space-around;
`;

export const StyledH4 = styled.div`
  ${Margin};
`;

export const StyledP = styled.p`
  ${Margin} font-size: .75em;

  ${media.mobile`
    margin: 1em 0;
  `}
`;

export const StyledDiv = styled.div`
  align-items: center;
  display: flex;
`;

export const StyledSpan = styled.span`
  font-size: 0.75em;
  margin: 0.5em 0 0.275em;
`;

export const ThumbsUp = styled(ThumbsUpIcon)`
  height: 15px;
`;
