import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onChange, onClick, query }) => (
  <div>
    <input onChange={e => onChange(e.target.value)} />
    <button onClick={() => onClick(query)}>Search</button>
  </div>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};

export default SearchBar;
