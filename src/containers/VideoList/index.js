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

  renderMessageOrNot = () => {
    if (!this.props.token) {
      return <div>End of results</div>
    } else if (this.props.isLoading) {
      return <div>Fetching more videos, brah</div>;
    } else {
      return null;
    }
  }

  render() {
    if (this.props.error) return <div>{`Bummer, dude. There seems to be an issue. ${this.props.error}`}</div>;

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
        {this.renderMessageOrNot()}
      </div>
    );
  }
}

const mapStateToProps = ({ scrollEvent, surfVideos }) => ({
  error: surfVideos.error,
  position: scrollEvent.position
});

VideoList.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  loadVideoDetailPage: PropTypes.func.isRequired,
  token: PropTypes.string,
  position: PropTypes.number.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, { loadVideoDetailPage })(
  VideoList
);
