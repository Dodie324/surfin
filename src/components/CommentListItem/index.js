import React from "react";
import PropTypes from "prop-types";

import {
  AvatarContainer,
  CommentListItemContainer,
  ContentContainer,
  Img,
  StyledDiv,
  StyledH4,
  StyledP,
  StyledSpan,
  ThumbsUp
} from "./styles";

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
      <StyledDiv>
        <ThumbsUp />
        <StyledSpan>{likeCount}</StyledSpan>
      </StyledDiv>
    </ContentContainer>
  </CommentListItemContainer>
);

CommentListItem.propTypes = {
  comment: PropTypes.object
};

export default CommentListItem;
