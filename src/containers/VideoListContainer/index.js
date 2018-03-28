import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchVideos } from "../../store/ducks/videos";
import { Filters, VideoList } from "..";
import { HeroVideo } from "../../components";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

import { Dab, NoResults, StyledMessage, Text } from "./styles";
import dab from "../../style/dab.png";

const InfiniteVideoList = withInfiniteScroll(VideoList);

const VideoListContainer = ({ isLoading, totalResults, videos }) => {
  const renderInfiniteList = () => {
    return <InfiniteVideoList type="Videos" videos={videos} />;
  };

  if (isLoading)
    return (
      <StyledMessage>
        <span>Loading...</span>
      </StyledMessage>
    );

  if (totalResults === 0)
    return (
      <NoResults>
        <Dab src={dab} />
        <Text>No videos found</Text>
      </NoResults>
    );

  return (
    <Fragment>
      <HeroVideo {...videos[0]} />
      <Filters />
      {renderInfiniteList()}
    </Fragment>
  );
};

const mapStateToProps = ({ loader, surfVideos }) => ({
  isLoading: loader.loading,
  totalResults: surfVideos.totalResults,
  videos: surfVideos.videos
});

VideoListContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number,
  videos: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, { fetchVideos })(VideoListContainer);
