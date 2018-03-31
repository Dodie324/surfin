import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  ButtonContainer,
  SearchBarContainer,
  StyledInput
} from "./styles";

const onEnter = fn => {
  return e => {
    if (e.keyCode === 13) fn();
  };
};

const SearchBar = ({ fetchVideos, onChange }) => {
  const handleKeyDown = onEnter(fetchVideos);
  const handleOnSubmit = e => {
    e.preventDefault();
    fetchVideos();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <SearchBarContainer>
        <StyledInput
          onChange={e => onChange(e.target.value)}
          placeholder="Search surfing videos"
          tabIndex={0}
        />
        <ButtonContainer onClick={fetchVideos} onKeyDown={handleKeyDown}>
          <Button />
        </ButtonContainer>
      </SearchBarContainer>
    </form>
  );
};

SearchBar.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;
