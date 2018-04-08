import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { saveScrollPosition } from "../../store/ducks/scrollEvent";
import { Filters, VideoList } from "..";
import { HeroVideo } from "../../components";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

import { StyledMessage } from "./styles";

const InfiniteVideoList = withInfiniteScroll(VideoList);

class VideoListContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, this.props.scrollPos);
  }

  loadPage = (id, snippet) => {
    this.props.saveScrollPosition(window.pageYOffset);
    this.props.loadVideoDetailPage(id, snippet);
  };

  render() {
    if (this.props.isLoading)
      return (
        <StyledMessage>
          <span>Loading...</span>
        </StyledMessage>
      );

    return (
      <Fragment>
        <HeroVideo loadFirstHit={true} />
        <Filters />
        <InfiniteVideoList loadPage={this.loadPage} type="Videos" />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ loader, scrollEvent }) => ({
  isLoading: loader.loading,
  scrollPos: scrollEvent.position,
});

VideoListContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadVideoDetailPage: PropTypes.func.isRequired,
  saveScrollPosition: PropTypes.func.isRequired,
  scrollPos: PropTypes.number,
  totalResults: PropTypes.number
};

export default connect(mapStateToProps, {
  loadVideoDetailPage,
  saveScrollPosition
})(VideoListContainer);
