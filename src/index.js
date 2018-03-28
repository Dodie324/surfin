import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './components';
import registerServiceWorker from './registerServiceWorker';
import createStore from "./store/createStore";

import "./style/global.css";

const store = createStore();

ReactDOM.render(<AppProvider store={store} />, document.getElementById('root'));
registerServiceWorker();
