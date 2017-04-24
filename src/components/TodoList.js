import React, { Component } from 'react';

import { List } from "material-ui/List"
import TodoItem from "./TodoItem"

import { toggleTodo } from "../actions/Todos" 
import { connect } from 'react-redux';

export class TodoList extends Component {
	static propTypes = {
		todos: React.PropTypes.arrayOf( React.PropTypes.shape( {
			id: React.PropTypes.number.isRequired,
			done: React.PropTypes.bool.isRequired,
			title: React.PropTypes.string.isRequired
		} ) )
	};

	render() {
		return (
			<div>
				<List>
					{ this.props.todos.map( todo => {
						return <TodoItem key={ todo.id } { ...todo } onCheck={ this.props.onCheck } />
					} ) }
				</List>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		todos: state.todos
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onCheck: id => {
			dispatch( toggleTodo( id ) )
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( TodoList )