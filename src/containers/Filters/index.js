import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Filter as FilterIcon } from "react-feather";

import { fetchVideos } from "../../store/ducks/videos";

import {
  CurrentFilter,
  FiltersContainer,
  FilterGroups,
  FilterList,
  FilterListItem,
  IconContainer,
  Menu,
  StyledSpan,
  Title
} from "./styles";

const FILTER_GROUPS = {
  "Sort By": [
    { type: "order,date", value: "Date" },
    { type: "order,rating", value: "Rating" },
    { type: "order,relevance", value: "Relevance" },
    { type: "order,title", value: "Title" },
    { type: "order,videoCount", value: "Video Count" },
    { type: "order,viewCount", value: "View Count" }
  ],
  Duration: [
    { type: "videoDuration,short", value: "Short (< 4 minutes)" },
    { type: "videoDuration,long", value: "Long (> 20 minutes)" }
  ],
  Features: [
    { type: "videoDefinition,high", value: "HD" },
    { type: "videoDefinition,standard", value: "Standard" },
    { type: "videoDimension,2d", value: "2D" },
    { type: "videoDimension,3d", value: "3D" }
  ]
};

class Filters extends Component {
  state = { showFilters: false };

  toggleFilters = () => this.setState({ showFilters: !this.state.showFilters });

  renderFilterGroups = () => (
    <FilterGroups>
      {Object.keys(FILTER_GROUPS).map(filterGroup => (
        <div key={filterGroup}>
          <Title>{filterGroup}</Title>
          <FilterList>
            {FILTER_GROUPS[filterGroup].map(({ type, value }) => (
              <FilterListItem
                key={type}
                onClick={() => this.props.fetchVideos(this.props.query, type)}
              >
                {value}
              </FilterListItem>
            ))}
          </FilterList>
        </div>
      ))}
    </FilterGroups>
  );

  render() {
    return (
      <FiltersContainer>
        <Menu>
          {!this.state.showFilters && (
            <CurrentFilter>{`Current filter: ${
              this.props.filter.split(",")[1]
            }`}</CurrentFilter>
          )}
          <IconContainer onClick={this.toggleFilters}>
            <FilterIcon />
            <StyledSpan>Filters</StyledSpan>
          </IconContainer>
        </Menu>
        {this.state.showFilters && this.renderFilterGroups()}
      </FiltersContainer>
    );
  }
}

const mapStateToProps = ({ surfVideos }) => ({
  filter: surfVideos.filter,
  query: surfVideos.query
});

Filters.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  filter: PropTypes.string,
  query: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { fetchVideos })(Filters);
