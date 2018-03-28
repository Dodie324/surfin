import React from "react";
import PropTypes from "prop-types";

import {
  Description,
  Overview,
  Title,
  Thumbnail,
  VideoListItemContainer
} from "./styles";

const VideoListItem = ({ id, loadPage, isVideoDetail, snippet }) => {
  const { description, thumbnails, title } = snippet;

  if (!thumbnails.high.url.includes("hqdefault")) return null;

  return (
    <VideoListItemContainer isVideoDetail={isVideoDetail} onClick={() => loadPage(id, snippet)}>
      <div>
        <Thumbnail alt={title} src={thumbnails.high.url} />
      </div>
      <Description>
        <Title>{title.toUpperCase()}</Title>
        {!isVideoDetail && <Overview>{description}</Overview>}
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
}

export default VideoListItem;
