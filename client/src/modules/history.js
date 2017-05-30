const ADD_ENTRY = "react-todos/history/ADD_ENTRY"

const initialState = []

export default function history( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_ENTRY:
			return [ ...state, action.path ]
		default:
			return state
	}
}

export function addEntry( path ) {
	return {
		type: ADD_ENTRY,
		path
	}
}