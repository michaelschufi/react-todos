import React, { Component } from 'react';

import { ListItem } from 'material-ui/List';
import Checkbox from "material-ui/Checkbox"
import IconButton from "material-ui/IconButton"
import ActionDelete from "material-ui/svg-icons/action/delete"

export class TodoItem extends Component {
	static propTypes = {
		title: React.PropTypes.string.isRequired,
		onCheck: React.PropTypes.func.isRequired,
		onDelete: React.PropTypes.func.isRequired
	};

	render() {
		return (
			<ListItem
				style={ { textDecoration: this.props.done ? "line-through" : "none" } }
				leftIcon={ <Checkbox onTouchTap={ ( e ) => { e.stopPropagation(); this.props.onCheck( this.props.id ) } } checked={ this.props.done } /> }
				// primaryText={
				// 	<div onTouchTap={ () => this.props.onTextTap( this.props.id ) }>
				// 		{ this.props.title }
				// 	</div>
				// }
				primaryText={ this.props.title }
				rightIconButton={ 
					<IconButton
						onTouchTap={ () => this.props.onDelete( this.props.id ) }
					>
						<ActionDelete />
					</IconButton>
				}
				// rightIcon={ <ActionDelete onTouchTap={ ( e ) => { e.stopPropagation(); } } /> }
				onTouchTap={ () => this.props.onTextTap( this.props.id ) }
			/>
		);
	}
}

export default TodoItem