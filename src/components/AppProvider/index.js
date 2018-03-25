import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import { App } from "../../containers";

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    background-color: #f6f8fb;
    height: auto;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }

  body {
    font-family: "Lato", Helvetica, sans-serif;
  }
`;

const AppProvider = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppProvider.propTypes = {
  store: PropTypes.object.isRequired
};

export default AppProvider;
