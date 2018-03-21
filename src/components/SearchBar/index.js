import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onChange, onClick }) => (
  <div>
    <input onChange={e => onChange(e)} />
    <button onClick={onClick}>Search</button>
  </div>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SearchBar;
