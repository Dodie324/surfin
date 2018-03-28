import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAdditionalVideos } from "../store/ducks/videos";
import { fetchAdditionalComments } from "../store/ducks/pageDetails";
import throttle from "lodash/throttle";

const withInfiniteScroll = Component => {
  class WithInfiniteScroll extends React.Component {
    componentDidMount = () =>
      window.addEventListener("scroll", this.onScroll, false);

    componentWillUnmount = () =>
      window.removeEventListener("scroll", this.onScroll, false);

    onScroll = throttle(() => {
      const loading = this.props[`loading${this.props.type}`];

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        const func = `fetchAdditional${this.props.type}`;
        this.props[func]();
      }
    }, 500);

    render() {
      const { fetchAdditionalVideos, ...props } = this.props;
      return <Component {...props} />;
    }
  }

  const mapStateToProps = ({ pageDetails, surfVideos }) => ({
    loadingComments: pageDetails.loadAdditional,
    loadingVideos: surfVideos.loadAdditional
  });

  WithInfiniteScroll.propTypes = {
    loadingComments: PropTypes.bool,
    loadingVideos: PropTypes.bool,
    fetchAdditionalComments: PropTypes.func,
    fetchAdditionalVideos: PropTypes.func,
    type: PropTypes.string.isRequired
  };

  return connect(mapStateToProps, {
    fetchAdditionalComments,
    fetchAdditionalVideos
  })(WithInfiniteScroll);
};

export default withInfiniteScroll;
