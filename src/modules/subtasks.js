const ADD_SUBTASK = "react-subtodos/subtasks/ADD_SUBTASK"
const TOGGLE_SUBTASK = "react-subtodos/subtasks/TOGGLE_SUBTASK"
const DELETE_SUBTASK = "react-subtodos/subtasks/DELETE_SUBTASK"
const DELETE_ALL_SUBTASKS = "react-subtodos/subtasks/DELETE_ALL_SUBTASKS"

const initialState = []

export default function subtasks( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_SUBTASK:
			let id = ( state.length === 0 ) ? 0 : state.reduce( ( nextId, subtask ) => { 
				return ( subtask.id >= nextId ? ( subtask.id + 1 ) : nextId ) 
			}, 0 );

			return [
				...state,
				{
					id: id,
					todoFk: action.todoFk,
					text: action.text || "",
					done: false
				}
			]

		case TOGGLE_SUBTASK:
			return state.map( subtask => {
				if ( subtask.id === action.id ) {
					return Object.assign( {}, subtask, {
						done: !subtask.done
					} )
				}
				return subtask
			} )

		case DELETE_ALL_SUBTASKS:
			return state.filter( subtask => { return subtask.todoFk !== action.todoFk } )

		case DELETE_SUBTASK:
			return state.filter( subtask => { return subtask.id !== action.id } )
		default:
			return state
	}
}

export function addSubtask( todoFk, text ) {
	return {
		type: ADD_SUBTASK,
		todoFk,
		text
	}
}

export function toggleSubtask( id ) {
	return {
		type: TOGGLE_SUBTASK,
		id
	}
}

export function deleteSubtask( id ) {
	return {
		type: DELETE_SUBTASK,
		id
	}
}

export function deleteAllSubtasks( todoFk ) {
	return {
		type: DELETE_ALL_SUBTASKS,
		todoFk
	}
}