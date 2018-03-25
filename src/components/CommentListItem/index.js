import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Margin = css`
  margin: 0.25em 0;
`;

const CommentListItemContainer = styled.article`
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 1em 0;
`;

const AvatarContainer = styled.div`
  justify-content: center;
  margin-right: 2em;
`;

const Img = styled.img`
  border-radius: 50%;
`;

const ContentContainer = styled.div`
  flex-direction: column;
  justify-content: space-around;
`;

const StyledH4 = styled.div`
  ${Margin};
`;

const StyledP = styled.p`
  ${Margin} font-size: .75em;
`;

const StyledSpan = styled.span`
  ${Margin} font-size: .75em;
`;

const CommentListItem = ({
  comment: { authorDisplayName, authorProfileImageUrl, likeCount, textOriginal }
}) => (
  <CommentListItemContainer>
    <AvatarContainer>
      <Img alt={authorDisplayName} src={authorProfileImageUrl} />
    </AvatarContainer>
    <ContentContainer>
      <StyledH4>{authorDisplayName}</StyledH4>
      <StyledP>{textOriginal}</StyledP>
      <StyledSpan>{likeCount}</StyledSpan>
    </ContentContainer>
  </CommentListItemContainer>
);

CommentListItem.propTypes = {
  comment: PropTypes.object
};

export default CommentListItem;
