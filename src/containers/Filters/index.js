import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchVideos } from "../../store/ducks/videos";

const FILTER_TYPES = [
  { type: "date", value: "Date" },
  { type: "rating", value: "Rating" },
  { type: "relevance", value: "Relevance" },
  { type: "title", value: "Title" },
  { type: "videoCount", value: "Video Count" },
  { type: "viewCount", value: "View Count" }
];

const Filters = ({ fetchVideos, query }) => (
  <div>
    <span>Filter</span>
    <ul>
      {FILTER_TYPES.map(({ type, value }) => (
        <li key={type} onClick={() => fetchVideos(query, type)}>
          {value}
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = ({ surfVideos }) => ({
  query: surfVideos.query
});

Filters.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { fetchVideos })(Filters);
