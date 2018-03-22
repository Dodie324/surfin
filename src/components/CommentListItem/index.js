import React from "react";
import PropTypes from "prop-types";

const CommentListItem = ({
  comment: { authorDisplayName, authorProfileImageUrl, likeCount, textOriginal }
}) => (
  <div>
    <div>
      <img alt={authorDisplayName} src={authorProfileImageUrl} />
    </div>
    <div>
      <h4>{authorDisplayName}</h4>
      <p>{textOriginal}</p>
      <span>{likeCount}</span>
    </div>
  </div>
);

CommentListItem.propTypes = {
  comment: PropTypes.object
}

export default CommentListItem;
