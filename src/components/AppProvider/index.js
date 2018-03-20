import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { App } from '..';

const AppProvider = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppProvider.propTypes = {
  store: PropTypes.object.isRequired
};

export default AppProvider;
