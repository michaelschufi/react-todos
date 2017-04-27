import { addSubtask } from "./subtasks"

const ADD_TODO = "react-todos/todos/ADD_TODO"
const DELETE_TODO = "react-todos/todos/DELETE_TODO"
const TOGGLE_TODO = "react-todos/todos/TOGGLE_TODO"

const initialState = []

export default function todos( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_TODO:
			return [
				...state,
				{
					id: action.id,
					title: action.todo.title || "",
					description: action.todo.description || "",
					subtasks: action.todo.subtasks || null,
					estimatedTime: action.todo.estimatedTime || "",
					deadline: action.todo.deadline || null,
					startTime: action.todo.startTime || null,
					folder: action.todo.folder || "inbox",
					done: false
				}
			]

		case TOGGLE_TODO:
			return state.map( todo => {
				if ( todo.id === action.id ) {
					return Object.assign( {}, todo, {
						done: !todo.done
					} )
				}
				return todo
			} )

		case DELETE_TODO:
			return state.filter( todo => { return todo.id !== action.id } )
		default:
			return state
	}
}

// export function addTodo( todo ) {
// 	return {
// 		type: ADD_TODO,
// 		todo
// 	}
// }

export function addTodo( todo, subtasks ) {
	return ( dispatch, getState ) => {
		let id = ( getState().todos.length === 0 ) ? 0 : getState().todos.reduce( ( nextId, todo ) => { 
			return ( todo.id >= nextId ? ( todo.id + 1 ) : nextId ) 
		}, 0 )

		dispatch( {
			type: ADD_TODO,
			id: id,
			todo: todo
		} )
		if( subtasks ) { subtasks.forEach( text => dispatch( addSubtask( id, text ) ) ) }
	}
}

export function toggleTodo( id ) {
	return {
		type: TOGGLE_TODO,
		id
	}
}

export function deleteTodo( id ) {
	return {
		type: DELETE_TODO,
		id
	}
}