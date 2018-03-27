import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { BaseLayout, BaseMessageStyle } from "../../style";

import { CommentListItem } from "../../components";

const StyledMessage = styled.div`
  ${BaseLayout} ${BaseMessageStyle};
`;

const CommentList = ({ comments, loading }) => (
  <Fragment>
    {comments.map(({ snippet: { topLevelComment } }) => (
      <CommentListItem
        comment={topLevelComment.snippet}
        key={topLevelComment.etag}
      />
    ))}
    {loading && <StyledMessage>Fetching more comments, brah</StyledMessage>}
  </Fragment>
);

const mapStateToProps = ({ pageDetails }) => ({
  loading: pageDetails.loadAdditionalComments
});

CommentList.propTypes = {
  loading: PropTypes.bool
};

export default connect(mapStateToProps)(CommentList);
