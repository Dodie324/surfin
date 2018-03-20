import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchVideos } from '../../store/ducks/videos';

class SearchBar extends Component {
  state = { query: '' };

  handleOnChange = query => this.setState({ query });

  render() {
    return (
      <div>
        <input onChange={e => this.handleOnChange(e.target.value)} />
        <button onClick={() => this.props.fetchVideos(this.state.query)}>
          Search
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  fetchVideos: PropTypes.func.isRequired
};

export default connect(null, { fetchVideos })(SearchBar);
