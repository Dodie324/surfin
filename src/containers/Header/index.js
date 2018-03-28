import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../logo.svg";

import { fetchVideos } from "../../store/ducks/videos";
import { returnToVideoList } from "../../store/ducks/pageDetails";
import { NavButton, SearchBar } from "../../components";

import { HeaderContainer, Logo, LogoContainer, Title } from "./styles";

class Header extends Component {
  state = { query: "" };

  handleOnChange = query => this.setState({ query });

  handleOnClick = () => {
    this.props.returnToVideoList();
    window.scrollTo(0, 0);
  };

  handleOnSubmit = () => this.props.fetchVideos(this.state.query);

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
          onSubmit={this.handleOnSubmit}
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
