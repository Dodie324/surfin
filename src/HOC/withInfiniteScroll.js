import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveScrollPosition } from "../store/ducks/scrollEvent";
import { fetchAdditionalVideos } from "../store/ducks/videos";
import throttle from "lodash/throttle";

const withInfiniteScroll = Component => {
  class WithInfiniteScroll extends React.Component {
    componentDidMount = () =>
      window.addEventListener("scroll", this.onScroll, false);

    componentWillUnmount = () =>
      window.removeEventListener("scroll", this.onScroll, false);

    onScroll = throttle(() => {
      this.props.saveScrollPosition(window.pageYOffset);

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !this.props.isLoading &&
        this.props.token
      ) {
        this.props.fetchAdditionalVideos();
      }
    }, 300);

    render() {
      const { fetchAdditionalVideos, ...props } = this.props;
      return <Component {...props} />;
    }
  }

  const mapStateToProps = ({ surfVideos }) => ({
    isLoading: surfVideos.isLoading,
    token: surfVideos.nextPageToken
  });

  WithInfiniteScroll.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchAdditionalVideos: PropTypes.func.isRequired,
    saveScrollPosition: PropTypes.func,
    token: PropTypes.string
  };

  return connect(mapStateToProps, {
    fetchAdditionalVideos,
    saveScrollPosition
  })(WithInfiniteScroll);
};

export default withInfiniteScroll;
