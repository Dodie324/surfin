import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CommentListItem } from "../../components";

import { CommentsContainer, StyledHeader, StyledMessage } from "./styles";

const CommentList = ({ comments, loading }) => {
  if (!comments.length)
    return <StyledMessage>No comments available</StyledMessage>;

  return (
    <Fragment>
      <StyledHeader>
        {comments.length === 1
          ? "1 comment"
          : `${comments.length} comments`}
      </StyledHeader>
      <CommentsContainer>
        {comments.map(({ snippet: { topLevelComment } }) => (
          <CommentListItem
            comment={topLevelComment.snippet}
            key={topLevelComment.etag}
          />
        ))}
        {loading && <StyledMessage>Fetching more comments, brah</StyledMessage>}
      </CommentsContainer>
    </Fragment>
  );
};

const mapStateToProps = ({ pageDetails }) => ({
  comments: pageDetails.comments.items,
  loading: pageDetails.loadAdditional
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool
};

export default connect(mapStateToProps)(CommentList);
