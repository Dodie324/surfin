import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { CommentList } from "..";
import { HeroVideo, VideoListItem } from "../../components";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

import {
  AuthorVideosContainer,
  StyledHeader,
  StyledMessage
} from "./styles";

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
            isVideoDetail={true}
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
      <Fragment>
        <StyledHeader>
          {comments.items.length === 1
            ? "1 comment"
            : `${comments.items.length} comments`}
        </StyledHeader>
        <InfiniteComments type="Comments" comments={comments.items} />
      </Fragment>
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
