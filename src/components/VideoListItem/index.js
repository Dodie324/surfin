import React, { Component } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual"

import {
  Description,
  Overview,
  Title,
  Thumbnail,
  VideoListItemContainer
} from "./styles";

class VideoListItem extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.video, nextProps.video);
  }

  render() {
    const { description, thumbnails, title } = this.props.video.snippet;

    if (!thumbnails.medium.url.includes('mqdefault')) return null;

    return (
      <VideoListItemContainer onClick={() => this.props.loadPage(this.props.video)}>
        <Thumbnail alt={title} src={thumbnails.medium.url} />
        <Description>
          <Title>{title.toUpperCase()}</Title>
          {!this.props.isVideoDetail && (
            <Overview title={description}>{description}</Overview>
          )}
        </Description>
      </VideoListItemContainer>
    );
  }
};

VideoListItem.propTypes = {
  isVideoDetail: PropTypes.bool,
  loadPage: PropTypes.func,
  video: PropTypes.object.isRequired
};

VideoListItem.defaultProps = {
  isVideoDetail: false
};

export default VideoListItem;
