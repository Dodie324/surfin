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
    if (this.props.showDetails) {
      return <VideoDetailPage />;
    } else {
      const { videos } = this.props;

      if (!videos.length) return <div>Hold on, dude. Fetching some gnarly vids</div>;

      const firstHit = videos[0];
      const InfiniteVideoList = withInfiniteScroll(VideoList);

      return (
        <Fragment>
          <HeroVideo id={firstHit.id} snippet={firstHit.snippet} />
          <Filters />
          <InfiniteVideoList videos={videos} />
        </Fragment>
      );
    }
  };

  render() {
    return (
      <div>
        <Header />
        {this.props.isLoading ? <div>Loading...</div> : this.renderComponent()}
      </div>
    );
  }
}

const mapStateToProps = ({ pageDetails, surfVideos }) => ({
  isLoading: pageDetails.isLoading,
  showDetails: pageDetails.showDetails,
  videos: surfVideos.videos
});

App.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, { fetchVideos })(App);
