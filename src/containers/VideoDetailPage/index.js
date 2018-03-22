import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { CommentList } from "../../components";

class VideoDetailPage extends Component {
  render() {
    return (
      <div>
        <iframe
          src={`https://youtube.com/embed/${this.props.id}?autoplay=1`}
          title={this.props.pageDetails.title}
        />
        <h2>{`${this.props.pageDetails.title} - ${this.props.pageDetails.channelTitle}`}</h2>
        <CommentList comments={this.props.comments} />
      </div>
    );
  }
}

const mapStateToProps = ({ pageDetails }) => ({
  comments: pageDetails.comments,
  id: pageDetails.videoId,
  pageDetails: pageDetails.videoPageDetails
});

VideoDetailPage.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  pageDetails: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(VideoDetailPage);
