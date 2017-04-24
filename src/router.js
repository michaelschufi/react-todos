import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './views/App';
import Add from './views/Add';
import NotFound from './views/NotFound';

const RootComponent = () => (
	<MuiThemeProvider>
		<Router history={ browserHistory }>
			<Route path="/"  component={ App } />
			<Route path="/add" component={ Add } />
			<Route path="*" component={ NotFound } />
		</Router>
	</MuiThemeProvider>
)

export default RootComponent;