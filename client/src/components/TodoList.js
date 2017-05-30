import React, { Component } from 'react';

import { List } from "material-ui/List"
import TodoItem from "./TodoItem"

import { browserHistory } from "react-router"

import moment from "moment"

import { toggleTodo, deleteTodo } from "../modules/todos"
import { deleteAllSubtasks } from "../modules/subtasks"
import { connect } from 'react-redux';

export class TodoList extends Component {
	static propTypes = {
		todos: React.PropTypes.arrayOf( React.PropTypes.shape( {
			id: React.PropTypes.number.isRequired,
			done: React.PropTypes.bool.isRequired,
			title: React.PropTypes.string.isRequired
		} ) )
	};

	handleTextTap( id ) {
		browserHistory.push( "/show/" + id )
	}

	render() {
		let todoItems = this.props.todos.map( todo => {
			return <TodoItem key={ todo.id } { ...todo } onCheck={ this.props.toggleTodo } onTextTap={ this.handleTextTap } onDelete={ this.props.deleteTodo } />
		} )

		let renderList;
		if ( todoItems.length === 0  ) {
			renderList = "No to-dos in this folder."
		} else {
			renderList = todoItems
		}

		return (
			<div>
				<List>
					{ renderList }
				</List>
			</div>
		);
	}
}

const filterTodos = ( todos, folder ) => {
	return todos.filter( todo => {
		let todoStart = moment( todo.startTime, "YYYY-MM-DD HH:mm" ).startOf( "day" )

		console.log( todo.title )
		console.log( todoStart.format() )
		console.log( moment().startOf( "day" ).format() )
		console.log( moment().startOf( "day" ).diff( todoStart, "days" ) )

		let dayDiff = todoStart.diff( moment().startOf( "day" ), "days" ) 

		switch ( folder ) {
			case "today":
				return dayDiff <= 0
			case "tomorrow":
				return dayDiff === 1
			case "scheduled":
				return dayDiff >= 2
			default:
				return todo.folder === folder && todo.startTime === null
		}
	} )
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		todos: filterTodos( state.todos, ownProps.folder ) 
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleTodo: id => {
			dispatch( toggleTodo( id ) )
		},
		deleteTodo: id => {
			dispatch( deleteTodo( id ) )
			dispatch( deleteAllSubtasks( id ) )
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( TodoList )