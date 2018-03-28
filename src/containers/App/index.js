import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchVideos } from "../../store/ducks/videos";
import { Header, VideoListContainer, VideoDetailPage } from "..";

import { Loader, LoaderContainer, Placeholder } from "./styles";
import dab from "../../style/dab.png";

class App extends Component {
  componentWillMount() {
    this.props.fetchVideos();
  }

  renderComponent = () => {
    if (this.props.showDetails) {
      return <VideoDetailPage />;
    } else {
      return <VideoListContainer />;
    }
  };

  render() {
    if (this.props.isLoading) {
      return (
        <LoaderContainer>
          <Loader src={dab} />
        </LoaderContainer>
      );
    }

    return (
      <div>
        <Header isDetailPage={this.props.showDetails} />
        <Placeholder />
        {this.renderComponent()}
      </div>
    );
  }
}

const mapStateToProps = ({ loader, pageDetails }) => ({
  showDetails: pageDetails.showDetails,
  isLoading: loader.loading
});

App.propTypes = {
  showDetails: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { fetchVideos })(App);
