import React from 'react';
import PropTypes from 'prop-types';

const VideoListItem = ({ id, snippet }) => {
  const { description, thumbnails, title } = snippet;

  return (
    <div id={id}>
      <div>
        <img alt={title} src={thumbnails.high.url} />
      </div>
      <div>
        <h5>{title.toUpperCase()}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
};

VideoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  snippet: PropTypes.object.isRequired
};

export default VideoListItem;
