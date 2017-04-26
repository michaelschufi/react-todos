const ADD_TODO = "react-todos/todos/ADD_TODO"
const ADD_SUBTASK = "react-todos/todos/ADD_SUBTASK"
const DELETE_TODO = "react-todos/todos/DELETE_TODO"
const TOGGLE_TODO = "react-todos/todos/TOGGLE_TODO"

const initialState = []

export default function todos( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_TODO:
			let id = ( state.length === 0 ) ? 0 : state.reduce( ( nextId, todo ) => { 
				return ( todo.id >= nextId ? ( todo.id + 1 ) : nextId ) 
			}, 0 );

			return [
				...state,
				{
					id: id,
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

		case ADD_SUBTASK:
			return state.map( todo => {
				if ( todo.id === action.id ) {
					return Object.assign( {}, todo, {
						subtasks: [ ...todo.subtasks, action.text ]
					} )
				}
				return todo
			} )

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
			console.log()
			return state.filter( todo => { return todo.id !== action.id } )
		default:
			return state
	}
}

export function addTodo( todo ) {
	return {
		type: ADD_TODO,
		todo
	}
}

export function addSubtask( id, text ) {
	return {
		type: ADD_SUBTASK,
		id,
		text
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