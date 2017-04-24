import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "../actions/actionTypes"

const initialState = [
	{ id: 0, done: false, title: "Initial Todo :)" }
] 

export default function todos( state = initialState, action ) {
	switch ( action.type ){
		case ADD_TODO:
			return [
				...state,
				{
					id: state.length,
					title: action.title,
					done: false
				}
			]
		case TOGGLE_TODO:
			return state.map( ( todo, id ) => {
				if ( id === action.id ) {
					return Object.assign( {}, todo, {
						done: !todo.done 
					} )
				}
				return todo
			} )
		default:
			return state
	}
}