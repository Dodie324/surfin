import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft } from "react-feather";

import { ButtonContainer, StyledSpan } from "./styles";

const NavButton = ({ onClick }) => (
  <ButtonContainer onClick={onClick}>
    <ArrowLeft />
    <StyledSpan>Go back</StyledSpan>
  </ButtonContainer>
);

NavButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NavButton;
