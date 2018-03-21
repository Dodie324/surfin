import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAdditionalVideos } from "../store/ducks/videos";
import throttle from "lodash/throttle";

const withInfiniteScroll = Component => {
  class WithInfiniteScroll extends React.Component {
    componentDidMount = () =>
      window.addEventListener("scroll", this.onScroll, false);

    componentWillUnmount = () =>
      window.removeEventListener("scroll", this.onScroll, false);

    onScroll = throttle(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !this.props.isLoading
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
    isLoading: surfVideos.isLoading
  });

  WithInfiniteScroll.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchAdditionalVideos: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, { fetchAdditionalVideos })(
    WithInfiniteScroll
  );
};

export default withInfiniteScroll;
