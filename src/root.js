import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk';
import rootReducer from "./reducer"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Add from './views/Add';
import ShowTodo from './views/ShowTodo';
import App from './views/App';
import NotFound from './views/NotFound';

const store = createStore( 
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware( thunk )
)
const history = syncHistoryWithStore( browserHistory, store )

// let currentState
// function handleAddTodos() {
// 	let previousState = currentState
// 	currentState = store.getState().todos
// 	if ( previousState !== currentState ) { console.log( previousState ); console.log( currentState ) }
// }
// let unsubscribe = store.subscribe( handleAddTodos )

import { addTodo } from "./modules/todos"
store.dispatch( addTodo( { 
	title: "Do stuff 1",
	description: "This is description.",
	estimatedTime: 135
}, [ "subtask 1", "subtask 2", "subtask 3", "subtask 4", "subtask 5" ] ) )

// import { addEntry } from "./modules/history"
// history.listen( location => { store.dispatch( addEntry( location.pathname ) ) } )

const Root = () => (
	<Provider store={ store }>
		<MuiThemeProvider>
			<Router history={ history }>
				<Route path="/add" component={ Add } />
				<Route path="/show/:id" component={ ShowTodo } />
				<Redirect from="/" to="/inbox" />
				<Route path="/(:folder)"  component={ App } />
				<Route path="*" component={ NotFound } />
			</Router>
		</MuiThemeProvider>
	</Provider>
)

export default Root;