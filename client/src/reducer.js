import { combineReducers } from "redux"

import todos from "./modules/todos"
import subtasks from "./modules/subtasks"
import history from "./modules/history"

import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers( {
	todos,
	subtasks,
	history,
	routing: routerReducer
} ) 

export default rootReducer