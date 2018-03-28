import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CommentListItem } from "../../components";

import { CommentsContainer, StyledMessage } from "./styles";

const CommentList = ({ comments, loading }) => (
  <CommentsContainer>
    {comments.map(({ snippet: { topLevelComment } }) => (
      <CommentListItem
        comment={topLevelComment.snippet}
        key={topLevelComment.etag}
      />
    ))}
    {loading && <StyledMessage>Fetching more comments, brah</StyledMessage>}
  </CommentsContainer>
);

const mapStateToProps = ({ pageDetails }) => ({
  loading: pageDetails.loadAdditional
});

CommentList.propTypes = {
  loading: PropTypes.bool
};

export default connect(mapStateToProps)(CommentList);
