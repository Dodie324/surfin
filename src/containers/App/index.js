import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchVideos } from "../../store/ducks/videos";
import { Header, VideoListContainer, VideoDetailPage } from "..";

const AppContainer = styled.div`
  background-color; #eef1f2;
`;

const Placeholder = styled.div`
  background-color: black;
  height: 519px;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

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
    return (
      <AppContainer>
        <Header isDetailPage={this.props.showDetails} />
        <Placeholder />
        {this.renderComponent()}
      </AppContainer>
    );
  }
};

const mapStateToProps = ({ pageDetails }) => ({
  showDetails: pageDetails.showDetails,
});

App.propTypes = {
  showDetails: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { fetchVideos })(App);
