import React from "react";
import PropTypes from "prop-types";

const NavButton = ({ onClick }) => <button onClick={onClick}>Back</button>;

NavButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NavButton;
