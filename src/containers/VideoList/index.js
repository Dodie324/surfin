import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BaseLayout, BaseListStyle } from "../../style";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { VideoListItem } from "../../components";

const VideoListContainer = styled.div`
  ${BaseLayout}
  ${BaseListStyle}
`;

const StyledMessage = styled.div`
  font-size: .75em;
  text-align: center;
  text-transform: uppercase;
`;

class VideoList extends Component {
  componentDidMount() {
    const { position } = this.props;
    window.scrollTo(0, position);
  }

  renderMessageOrNot = () => {
    if (!this.props.token) {
      return <StyledMessage>End of results</StyledMessage>
    } else if (this.props.isLoading) {
      return <StyledMessage>Fetching more videos, brah</StyledMessage>;
    } else {
      return null;
    }
  }

  render() {
    if (this.props.error) return <div>{`Bummer, dude. There seems to be an issue. ${this.props.error}`}</div>;

    return (
      <VideoListContainer>
        {this.props.videos.map(({ etag, id, snippet }) => (
          <VideoListItem
            id={id.videoId}
            key={etag + Math.random()}
            loadPage={this.props.loadVideoDetailPage}
            snippet={snippet}
          />
        ))}
        {this.renderMessageOrNot()}
      </VideoListContainer>
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
