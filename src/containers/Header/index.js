import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import logo from "./logo.svg";
import { fetchVideos } from "../../store/ducks/videos";
import { returnToVideoList } from "../../store/ducks/pageDetails";
import { NavButton, SearchBar } from "../../components";

const HeaderContainer = styled.div`
  background-color: #24292e;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 0 2em;
  position: fixed;
  width: 100%;
`;

const LogoContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 1;
  margin-left: 1em;
`;

const Logo = styled.img`
  height: 30px;
`;

const Title = styled.h1`
  color: #fff;
  font-weight: bold;
  margin: 0;
`;

class Header extends Component {
  state = { query: "" };

  handleOnChange = query => this.setState({ query });

  handleOnClick = () => {
    this.props.returnToVideoList();
    window.scrollTo(0, 0);
  }

  fetchVideos = () => this.props.fetchVideos(this.state.query);

  render() {
    return (
      <HeaderContainer>
        <LogoContainer onClick={this.handleOnClick}>
          <Logo src={logo} alt="logo" />
          <Title>surfin</Title>
        </LogoContainer>
        {this.props.isDetailPage && (
          <NavButton onClick={this.props.returnToVideoList} />
        )}
        <SearchBar
          onChange={this.handleOnChange}
          onClick={this.fetchVideos}
          query={this.state.query}
        />
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  isDetailPage: PropTypes.bool.isRequired,
  returnToVideoList: PropTypes.func.isRequired
};

export default connect(null, { fetchVideos, returnToVideoList })(Header);
