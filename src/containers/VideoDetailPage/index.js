import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const VideoDetailPage = ({ id, data }) => {
  const url = `https://youtube.com/embed/${id}?autoplay=1`;
  return (
    <div>
      <iframe src={url} title={data.title} />
      <h2>{`${data.title} - ${data.channelTitle}`}</h2>
    </div>
  );
};

const mapStateToProps = ({ pageDetails }) => ({
  id: pageDetails.videoPageId,
  data: pageDetails.videoPageDetails
});

VideoDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(VideoDetailPage);
