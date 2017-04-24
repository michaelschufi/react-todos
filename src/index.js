import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { createStore } from "redux";
import todoApp from "./reducers"

import Router from './router.js';

import "./style.css";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let store = createStore( todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

ReactDOM.render(
	<Provider store={ store }>
		<Router />
	</Provider>,
	document.getElementById( 'root' )
)