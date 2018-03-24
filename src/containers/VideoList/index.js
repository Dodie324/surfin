import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { VideoListItem } from "../../components";

class VideoList extends Component {
  componentDidMount() {
    const { position } = this.props;
    window.scrollTo(0, position);
  }

  render() {
    return (
      <div>
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

const mapStateToProps = ({ scrollEvent }) => ({
  position: scrollEvent.position
});

VideoList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadVideoDetailPage: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, { loadVideoDetailPage })(
  VideoList
);
