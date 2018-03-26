import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BaseLayout, BaseListStyle } from "../../style";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { CommentListItem, HeroVideo, VideoListItem } from "../../components";

const StyledHeader = styled.h5`
  ${BaseLayout} font-style: italic;
  padding-top: 1em;
`;

const AuthorVideosContainer = styled.div`
  ${BaseLayout} ${BaseListStyle}
  border-bottom: 1px solid #ccc;
`;

const CommentsContainer = styled.div`
  ${BaseLayout} margin-bottom: 1em;
  max-width: 850px;
`;

class VideoDetailPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderAuthorVidoes = () => (
    <Fragment>
      <StyledHeader>Other videos from this author</StyledHeader>
      <AuthorVideosContainer>
        {this.props.authorVideos.map(({ etag, id, snippet }) => (
          <VideoListItem
            showDescription={false}
            id={id.videoId}
            key={etag + Math.random()}
            loadPage={this.props.loadVideoDetailPage}
            snippet={snippet}
          />
        ))}
      </AuthorVideosContainer>
    </Fragment>
  );

  renderComments = () => (
    <CommentsContainer>
      <StyledHeader>{this.props.comments.length === 1 ? '1 comment' :
        `${this.props.comments.length} comments`}</StyledHeader>
      {this.props.comments.map(({ snippet: { topLevelComment } }) => (
        <CommentListItem
          comment={topLevelComment.snippet}
          key={topLevelComment.etag}
        />
      ))}
    </CommentsContainer>
  );

  render() {
    const { pageDetails, videoId } = this.props;
    return (
      <div>
        <HeroVideo id={{ videoId }} mute={0} snippet={pageDetails} />
        {this.renderAuthorVidoes()}
        {this.renderComments()}
      </div>
    );
  }
}

const mapStateToProps = ({ pageDetails }) => ({
  authorVideos: pageDetails.authorVideos,
  comments: pageDetails.comments,
  videoId: pageDetails.videoId,
  pageDetails: pageDetails.videoPageDetails
});

VideoDetailPage.propTypes = {
  authorVideos: PropTypes.arrayOf(PropTypes.object),
  comments: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
  loadVideoDetailPage: PropTypes.func.isRequired,
  pageDetails: PropTypes.object
};

export default connect(mapStateToProps, { loadVideoDetailPage })(
  VideoDetailPage
);
