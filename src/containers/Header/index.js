import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchVideos } from "../../store/ducks/videos";
import { returnToVideoList } from "../../store/ducks/pageDetails";
import { NavButton, SearchBar } from "../../components";

class Header extends Component {
  state = { query: "" };

  handleOnChange = query => this.setState({ query });

  fetchVideos = () => this.props.fetchVideos(this.state.query);

  render() {
    return (
      <div>
        <NavButton onClick={this.props.returnToVideoList} />
        <SearchBar
          onChange={this.handleOnChange}
          onClick={this.fetchVideos}
          query={this.state.query}
        />
      </div>
    );
  }
}

Header.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  returnToVideoList: PropTypes.func.isRequired
};

export default connect(null, { fetchVideos, returnToVideoList })(Header);
