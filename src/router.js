import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './views/App';
import Add from './views/Add';
import NotFound from './views/NotFound';

const Router = () => (
	<BrowserRouter>
		<MuiThemeProvider>
			<Switch>
				<Route path="/add" exact component={ Add } />
				<Route path="/" exact component={ App } >
				</Route>
				<Route component={ NotFound } />
			</Switch>
		</MuiThemeProvider>
	</BrowserRouter>
)

export default Router;