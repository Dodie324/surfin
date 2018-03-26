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

class VideoListContainer extends Component {
  renderInfiniteList = () => {
    return (
      <InfiniteVideoList
        isLoading={this.props.loadingAdditional}
        position={this.props.scrollPos}
        videos={this.props.videos}
      />
    );
  };

  render() {
    if (this.props.loadingInitial)
      return <StyledMessage><span>Loading...</span></StyledMessage>;

    if (this.props.totalResults === 0)
      return <StyledMessage><NoResults>No videos found</NoResults></StyledMessage>;

    return (
      <Fragment>
        <HeroVideo {...this.props.videos[0]} />
        <Filters />
        {this.renderInfiniteList()}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ scrollEvent, surfVideos }) => ({
  loadingAdditional: surfVideos.loadingAdditional,
  loadingInitial: surfVideos.loadingInitial,
  scrollPos: scrollEvent.position,
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
