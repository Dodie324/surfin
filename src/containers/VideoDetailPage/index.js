import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { CommentList, VideoListItem } from "../../components";

class VideoDetailPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // renderHeroVideo = () => (
  //   <div>
  //     <iframe
  //       src={`https://youtube.com/embed/${this.props.id}?autoplay=1`}
  //       title={this.props.pageDetails.title}
  //     />
  //     <h2>{`${this.props.pageDetails.title} - ${
  //       this.props.pageDetails.channelTitle
  //     }`}</h2>
  //   </div>
  // );

  renderAuthorVidoes = () => (
    <div>
      {this.props.authorVideos.map(({ etag, id, snippet }) => (
        <VideoListItem
          id={id.videoId}
          key={etag + Math.random()}
          loadPage={this.props.loadVideoDetailPage}
          snippet={snippet}
        />
      ))}
    </div>
  );

  render() {
    return (
      <div>
        {/* {this.renderHeroVideo()} */}
        {this.renderAuthorVidoes()}
        <CommentList comments={this.props.comments} />
      </div>
    );
  }
}

const mapStateToProps = ({ pageDetails }) => ({
  authorVideos: pageDetails.authorVideos,
  comments: pageDetails.comments,
  id: pageDetails.videoId,
  pageDetails: pageDetails.videoPageDetails
});

VideoDetailPage.propTypes = {
  authorVideos: PropTypes.arrayOf(PropTypes.object),
  comments: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
  loadVideoDetailPage: PropTypes.func.isRequired,
  pageDetails: PropTypes.object
};

export default connect(mapStateToProps, { loadVideoDetailPage })(VideoDetailPage);
