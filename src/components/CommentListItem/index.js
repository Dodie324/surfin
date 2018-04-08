import React, { Component } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";

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

class CommentListItem extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.comment, nextProps.comment);
  }

  render() {
    const {
      authorDisplayName,
      authorProfileImageUrl,
      likeCount,
      textOriginal
    } = this.props.comment;
    return (
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
  }
}

CommentListItem.propTypes = {
  comment: PropTypes.object
};

export default CommentListItem;
