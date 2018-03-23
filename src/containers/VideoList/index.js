import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchVideos } from "../../store/ducks/videos";
import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { Filters } from "..";
import { VideoListItem } from "../../components";

class VideoList extends Component {
  componentDidMount() {
    const {fetchVideos, position, videos } = this.props;
    window.scrollTo(0, position);
    if (!videos.length) fetchVideos();
  }

  render() {
    return (
      <div>
        <Filters />
        {this.props.videos.map(({ etag, id, snippet }) => (
          <VideoListItem
            id={id.videoId}
            key={etag + Math.random()}
            loadPage={this.props.loadVideoDetailPage}
            snippet={snippet}
          />
        ))}
        {this.props.isLoading && <span>Fetching some more videos, brah</span>}
      </div>
    );
  }
}

const mapStateToProps = ({ scrollEvent, surfVideos }) => ({
  position: scrollEvent.position,
  videos: surfVideos.videos
});

VideoList.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadVideoDetailPage: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, { fetchVideos, loadVideoDetailPage })(
  VideoList
);
