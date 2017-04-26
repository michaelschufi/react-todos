import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root.js';

import "./style.css";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


ReactDOM.render(
	<Root />,
	document.getElementById( 'root' )
)