import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BaseLayout, BaseListStyle, BaseMessageStyle } from "../../style";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { CommentList } from "..";
import { HeroVideo, VideoListItem } from "../../components";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

const StyledHeader = styled.h5`
  ${BaseLayout} font-style: italic;
  padding-top: 1em;
`;

const AuthorVideosContainer = styled.div`
  ${BaseListStyle} border-bottom: 1px solid #ccc;
`;

const CommentsContainer = styled.div`
  ${BaseLayout} margin-bottom: 1em;
  max-width: 850px;
`;

const StyledMessage = styled.div`
  ${BaseMessageStyle};
`;

const InfiniteComments = withInfiniteScroll(CommentList);

class VideoDetailPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderAuthorVidoes = () => (
    <Fragment>
      <StyledHeader>Other videos from this author</StyledHeader>
      <AuthorVideosContainer>
        {this.props.authorVideos.items.map(({ etag, id, snippet }) => (
          <VideoListItem
            id={id.videoId}
            key={etag + Math.random()}
            loadPage={this.props.loadVideoDetailPage}
            showDescription={false}
            snippet={snippet}
          />
        ))}
      </AuthorVideosContainer>
    </Fragment>
  );

  renderComments = () => {
    const { comments } = this.props;

    if (!comments.items.length)
      return <StyledMessage>No comments available</StyledMessage>;

    return (
      <CommentsContainer>
        <StyledHeader>
          {comments.items.length === 1
            ? "1 comment"
            : `${comments.items.length} comments`}
        </StyledHeader>
        <InfiniteComments type="Comments" comments={comments.items} />
      </CommentsContainer>
    );
  };

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
  authorVideos: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  id: PropTypes.string,
  loadVideoDetailPage: PropTypes.func.isRequired,
  pageDetails: PropTypes.object
};

export default connect(mapStateToProps, { loadVideoDetailPage })(
  VideoDetailPage
);
