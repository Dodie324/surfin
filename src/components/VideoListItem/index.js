import React from "react";
import PropTypes from "prop-types";

import {
  Description,
  Overview,
  Title,
  Thumbnail,
  VideoListItemContainer
} from "./styles";

const VideoListItem = ({
  id,
  loadPage,
  isVideoDetail,
  snippet
}) => {
  const { description, thumbnails, title } = snippet;

  return (
    <VideoListItemContainer onClick={() => loadPage(id, snippet)}>
      <Thumbnail alt={title} src={thumbnails.medium.url} />
      <Description>
        <Title>{title.toUpperCase()}</Title>
        {!isVideoDetail && (
          <Overview title={description}>{description}</Overview>
        )}
      </Description>
    </VideoListItemContainer>
  );
};

VideoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  isVideoDetail: PropTypes.bool,
  loadPage: PropTypes.func,
  snippet: PropTypes.object.isRequired
};

VideoListItem.defaultProps = {
  isVideoDetail: false
};

export default VideoListItem;
