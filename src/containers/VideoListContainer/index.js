import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BaseMessageStyle } from "../../style";

import { fetchVideos } from "../../store/ducks/videos";
import { Filters, VideoList } from "..";
import { HeroVideo } from "../../components";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

const StyledMessage = styled.div`
  ${BaseMessageStyle} padding-top: 2em;
`;

const NoResults = styled.span`
  color: red;
  font-size: 2em;
  position: absolute;
  top: 30%;
`;

const InfiniteVideoList = withInfiniteScroll(VideoList);

const VideoListContainer = ({ loadingInitial, totalResults, videos }) => {
  const renderInfiniteList = () => {
    return (
      <InfiniteVideoList
        type="Videos"
        videos={videos}
      />
    );
  };

  if (loadingInitial)
    return (
      <StyledMessage>
        <span>Loading...</span>
      </StyledMessage>
    );

  if (totalResults === 0)
    return (
      <StyledMessage>
        <NoResults>No videos found</NoResults>
      </StyledMessage>
    );

  return (
    <Fragment>
      <HeroVideo {...videos[0]} />
      <Filters />
      {renderInfiniteList()}
    </Fragment>
  );
};

const mapStateToProps = ({ scrollEvent, surfVideos }) => ({
  loadingAdditional: surfVideos.loadingAdditional,
  loadingInitial: surfVideos.loadingInitial,

  totalResults: surfVideos.totalResults,
  videos: surfVideos.videos
});

VideoListContainer.propTypes = {
  loadingAdditional: PropTypes.bool.isRequired,
  loadingInitial: PropTypes.bool.isRequired,
  totalResults: PropTypes.number,
  videos: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, { fetchVideos })(VideoListContainer);
