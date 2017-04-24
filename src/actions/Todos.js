import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "./actionTypes"

let nextTodoId = 1;
export function addTodo( title ) {
	return {
		type: ADD_TODO,
		title
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
