import React from "react";
import { CommentListItem } from "..";

const CommentList = ({ comments }) => (
  <div>
    {comments.map(({ snippet: { topLevelComment } }) => (
      <CommentListItem
        comment={topLevelComment.snippet}
        key={topLevelComment.etag}
      />
    ))}
  </div>
);

export default CommentList;
