import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, VideoList, VideoDetailPage } from "..";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

const App = ({ showDetails }) => {
  const InfiniteVideoList = withInfiniteScroll(VideoList);

  return (
    <div>
      <Header />
      {showDetails ? <VideoDetailPage /> : <InfiniteVideoList />}
    </div>
  );
};

const mapStateToProps = ({ pageDetails }) => ({
  showDetails: pageDetails.showDetails
});

App.propTypes = {
  showDetails: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(App);
