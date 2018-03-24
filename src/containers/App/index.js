import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchVideos } from "../../store/ducks/videos";
import { Filters, Header, VideoList, VideoDetailPage } from "..";
import { HeroVideo } from "../../components";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

class App extends Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  renderComponent = () => {
    const { isLoading, showDetails, totalResults, videos } = this.props;

    switch (true) {
      case isLoading:
        return <div>Loading...</div>;
      case showDetails:
        return <VideoDetailPage />;
      case totalResults === 0:
        return <div>No videos found</div>;
      case videos.length > 0:
        const firstHit = videos[0];
        const InfiniteVideoList = withInfiniteScroll(VideoList);

        return (
          <Fragment>
            <HeroVideo id={firstHit.id} snippet={firstHit.snippet} />
            <Filters />
            <InfiniteVideoList videos={videos} />
          </Fragment>
        );
      default:
        return <div>Hold on, dude. Fetching some gnarly vids</div>;
    }
  };

  render() {
    return (
      <div>
        <Header />
        {this.renderComponent()}
      </div>
    );
  }
}

const mapStateToProps = ({ pageDetails, surfVideos }) => ({
  isLoading: pageDetails.isLoading,
  showDetails: pageDetails.showDetails,
  totalResults: surfVideos.totalResults,
  videos: surfVideos.videos
});

App.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired,
  totalResults: PropTypes.number,
  videos: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, { fetchVideos })(App);
