import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { CommentList } from "..";
import { HeroVideo, VideoListItem } from "../../components";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

import {
  AuthorVideosContainer,
  StyledHeader
} from "./styles";

const InfiniteComments = withInfiniteScroll(CommentList);

class VideoDetailsContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderAuthorVidoes = () => (
    <Fragment>
      <StyledHeader>Other videos from this author</StyledHeader>
      <AuthorVideosContainer>
        {this.props.authorVideos.map(video => (
          <VideoListItem
            key={video.etag}
            loadPage={this.props.loadVideoDetailPage}
            isVideoDetail={true}
            video={video}
          />
        ))}
      </AuthorVideosContainer>
    </Fragment>
  );

  render() {
    return (
      <div>
        <HeroVideo mute={0} />
        {this.renderAuthorVidoes()}
        <InfiniteComments type="Comments" />
      </div>
    );
  }
}

const mapStateToProps = ({ pageDetails }) => ({
  authorVideos: pageDetails.authorVideos.items
});

VideoDetailsContainer.propTypes = {
  authorVideos: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadVideoDetailPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { loadVideoDetailPage })(
  VideoDetailsContainer
);
