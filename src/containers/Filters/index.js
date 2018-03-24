import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchVideos } from "../../store/ducks/videos";

const FILTER_GROUPS = {
  "Sort By": [
    { type: "order,date", value: "Date" },
    { type: "order,rating", value: "Rating" },
    { type: "order,relevance", value: "Relevance" },
    { type: "order,title", value: "Title" },
    { type: "order,videoCount", value: "Video Count" },
    { type: "order,viewCount", value: "View Count" }
  ],
  "Duration": [
    { type: "videoDuration,short", value: "Short (< 4 minutes)" },
    { type: "videoDuration,long", value: "Long (> 20 minutes)" }
  ],
  "Features": [
    { type: "videoDefinition,high", value: "HD" },
    { type: "videoDefinition,standard", value: "Standard" },
    { type: "videoDimension,2d", value: "2D" },
    { type: "videoDimension,3d", value: "3D" },
  ]
};

const Filters = ({ fetchVideos, query }) => (
  <div>
    {Object.keys(FILTER_GROUPS).map(filterGroup => (
      <div key={filterGroup}>
        <span>{filterGroup}</span>
        <ul>
          {FILTER_GROUPS[filterGroup].map(({ type, value }) => (
            <li key={type} onClick={() => fetchVideos(query, type)}>
              {value}
            </li>
          ))}
        </ul>
      </div>
    ))}
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
