import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.js';

import "./style.css";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
	<Router />,
	document.getElementById( 'root' )
);