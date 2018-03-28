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

const SearchBar = ({ onChange, onClick, onSubmit, query }) => {
  const handleKeyDown = onEnter(onSubmit);
  const handleOnSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <SearchBarContainer>
        <StyledInput
          onChange={e => onChange(e.target.value)}
          placeholder="Search"
          tabIndex={0}
        />
        <ButtonContainer
          onClick={() => onClick(query)}
          onKeyDown={handleKeyDown}
        >
          <Button />
        </ButtonContainer>
      </SearchBarContainer>
    </form>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};

export default SearchBar;
