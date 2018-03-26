import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Filter as FilterIcon } from "react-feather";
import { BaseLayout } from "../../style";

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

const FiltersContainer = styled.div`
  background-color: #fafbfc;
  border-bottom: 1px solid #ccc;
  padding: 1em 0;
`;

const Menu = styled.div`
  ${BaseLayout} align-items: center;
  display: flex;
  justify-content: ${props => (!props.children[0] ? "flex-end" : "flex-start")};
`;

const CurrentFilter = styled.span`
  flex: 1;
  font-size: 0.85em;
  text-transform: uppercase;
`;

const IconContainer = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  font-size: 0.85em;
  text-transform: uppercase;
`;

const FilterGroups = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 1200px;
`;

const FilterList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const FilterListItem = styled.li`
  cursor: pointer;
  font-weight: lighter;
  padding: 0.25em 0;
`;

const Title = styled.h4`
  border-bottom: 1px solid rgba(255, 255, 255, 0.125);
  font-weight: bold;
  margin-top: 0;
`;

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
      <FiltersContainer key={1}>
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
