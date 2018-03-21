import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchVideos } from "../../store/ducks/videos";
import { VideoListItem } from "..";

class VideoList extends Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    return (
      <div>
        {this.props.videos.map(({ etag, id, snippet }) => (
          <VideoListItem
            id={id.videoId}
            key={etag + Math.random()}
            snippet={snippet}
          />
        ))}
        {this.props.isLoading && <span>Fetching some more videos, brah</span>}
      </div>
    );
  }
}

const mapStateToProps = ({ surfVideos }) => ({
  videos: surfVideos.videos
});

VideoList.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, { fetchVideos })(VideoList);
