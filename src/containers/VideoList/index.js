import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { VideoListItem } from "../../components";

import {
  Dab,
  NoResults,
  StyledMessage,
  Text,
  VideoListContainer
} from "./styles";
import dab from "../../style/dab.png";

const VideoList = ({ error, isLoading, loadPage, totalResults, videos }) => {
  if (error) {
    return (
      <StyledMessage>{`Bummer, dude. There seems to be an issue. ${
        this.props.error
      }`}</StyledMessage>
    );
  }

  if (videos.length === 0) {
    return (
      <NoResults>
        <Dab src={dab} />
        <Text>No videos found</Text>
      </NoResults>
    );
  }

  return (
    <Fragment>
      <VideoListContainer>
        {videos.map(video => (
          <VideoListItem
            key={video.etag}
            loading={isLoading}
            loadPage={loadPage}
            video={video}
          />
        ))}
      </VideoListContainer>
      {isLoading && <StyledMessage>Fetching more videos, brah</StyledMessage>}
    </Fragment>
  );
};

const mapStateToProps = ({ surfVideos }) => ({
  error: surfVideos.error,
  isLoading: surfVideos.loadAdditional,
  videos: surfVideos.videoData.items
});

VideoList.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps)(VideoList);
