import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import Add from './components/Add';
import NotFound from './components/NotFound';
// import About from './components/About';


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