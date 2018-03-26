import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BaseLayout, BaseListStyle, BaseMessageStyle } from "../../style";

import { loadVideoDetailPage } from "../../store/ducks/pageDetails";
import { saveScrollPosition } from "../../store/ducks/scrollEvent";
import { VideoListItem } from "../../components";

const VideoListContainer = styled.div`
  ${BaseLayout} ${BaseListStyle};
`;

const StyledMessage = styled.div`
  ${BaseLayout} ${BaseMessageStyle};
`;

class VideoList extends Component {
  componentDidMount() {
    const { position } = this.props;
    window.scrollTo(0, position);
  }

  loadPage = (id, snippet) => {
    this.props.saveScrollPosition(window.pageYOffset);
    this.props.loadVideoDetailPage(id, snippet);
  };

  renderMessageOrNot = () => {
    if (this.props.remainingCount <= 0) {
      return <StyledMessage>End of results</StyledMessage>;
    } else if (this.props.isLoading) {
      return <StyledMessage>Fetching more videos, brah</StyledMessage>;
    } else {
      return null;
    }
  };

  render() {
    if (this.props.error) {
      return (
        <StyledMessage>{`Bummer, dude. There seems to be an issue. ${
          this.props.error
        }`}</StyledMessage>
      );
    }

    return (
      <Fragment>
        <VideoListContainer>
          {this.props.videos.map(({ etag, id, snippet }) => (
            <VideoListItem
              id={id.videoId}
              key={etag + Math.random()}
              loadPage={this.loadPage}
              snippet={snippet}
            />
          ))}
        </VideoListContainer>
        {this.renderMessageOrNot()}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ surfVideos }) => ({
  error: surfVideos.error,
  remainingCount: surfVideos.remainingCount
});

VideoList.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  loadVideoDetailPage: PropTypes.func.isRequired,
  remainingCount: PropTypes.number,
  saveScrollPosition: PropTypes.func.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, {
  loadVideoDetailPage,
  saveScrollPosition
})(VideoList);
