import { combineReducers } from "redux"
import todos from "./modules/todos"
import history from "./modules/history"

import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers( {
	todos,
	history,
	routing: routerReducer
} ) 

export default rootReducer