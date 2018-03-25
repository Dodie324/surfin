import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ArrowLeft } from "react-feather";

const ButtonContainer = styled.div`
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;
`;

const StyledSpan = styled.span`
  font-size: .85em;
  text-transform: uppercase;
`;

const NavButton = ({ onClick }) => (
  <ButtonContainer onClick={onClick}>
    <ArrowLeft/>
    <StyledSpan>Go back</StyledSpan>
  </ButtonContainer>
);

NavButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NavButton;
