import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { fetchVideos } from '../../store/ducks/videos';
import { VideoListItem } from '..';

class VideoList extends Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    return (
      <div>
        {this.props.videos.map(({ etag, id, snippet }) => (
          <VideoListItem id={id.videoId} key={etag} snippet={snippet} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ surfVideos }) => ({
  videos: surfVideos.videos
});

VideoList.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(mapStateToProps, { fetchVideos })(VideoList);
