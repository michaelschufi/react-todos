import React, { Component } from 'react';

import { ListItem } from 'material-ui/List';
import Checkbox from "material-ui/Checkbox"

export class TodoItem extends Component {
	static propTypes = {
		title: React.PropTypes.string.isRequired
	};

	render() {
		return (
			<ListItem
				style={ { textDecoration: this.props.done ? "line-through" : "none" } }
				leftCheckbox={ <Checkbox onCheck={ () => this.props.onCheck( this.props.id ) } checked={ this.props.done } /> }
				primaryText={ this.props.title }
			/>
		);
	}
}

export default TodoItem