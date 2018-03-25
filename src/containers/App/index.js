import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchVideos } from "../../store/ducks/videos";
import { Filters, Header, VideoList, VideoDetailPage } from "..";
import { HeroVideo } from "../../components";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

const AppContainer = styled.div`
  background-color; #eef1f2;
`;

const StyledMessage = styled.div`
  font-size: .75em;
  text-align: center;
  text-transform: uppercase;
`;

class App extends Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  renderComponent = () => {
    const { isLoading, showDetails, totalResults, videos } = this.props;

    switch (true) {
      case isLoading:
        return <StyledMessage>Loading...</StyledMessage>;
      case showDetails:
        return <VideoDetailPage />;
      case totalResults === 0:
        return <StyledMessage>No videos found</StyledMessage>;
      case videos.length > 0:
        const InfiniteVideoList = withInfiniteScroll(VideoList);
        return (
          <Fragment>
            <Filters />
            <InfiniteVideoList videos={videos} />
          </Fragment>
        );
      default:
        return <div>Hold on, dude. Fetching some gnarly vids</div>;
    }
  };

  render() {
    let videoData;
    if (this.props.showDetails) {
      videoData = { id: { videoId: this.props.id }, snippet: this.props.pageDetails };
    } else {
      videoData = this.props.videos[0];
    }

    return (
      <AppContainer>
        <Header isDetailPage={this.props.showDetails} />
        <HeroVideo {...videoData} />
        {this.renderComponent()}
      </AppContainer>
    );
  }
}

const mapStateToProps = ({ pageDetails, surfVideos }) => ({
  id: pageDetails.videoId,
  isLoading: pageDetails.isLoading,
  showDetails: pageDetails.showDetails,
  totalResults: surfVideos.totalResults,
  pageDetails: pageDetails.videoPageDetails,
  videos: surfVideos.videos
});

App.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired,
  totalResults: PropTypes.number,
  videos: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, { fetchVideos })(App);
