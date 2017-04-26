import React, { Component } from 'react';

import TextField from "material-ui/TextField"
import Checkbox from "material-ui/Checkbox"
import IconButton from "material-ui/IconButton"
import ActionDelete from "material-ui/svg-icons/action/delete"

const styles = { 
	wrapper: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row"
	},
	checkbox: { 
		width: "auto",
		display: "inline-block"
	},
	deleteButton: {
		color: "#B7B7B7"
	}
}

export class Subtask extends Component {
	constructor( props ) {
		super( props )

		this.state = {
			focused: false,
			text: props.text
		}

		this.handleTouchTap = this.handleTouchTap.bind( this )
		this.handleBlur = this.handleBlur.bind( this )
	}

	handleTouchTap() {
		this.setState( { focused: true } )
	}

	handleBlur( event ) {
		this.setState( { focused: false } )

		if ( this.state.text !== event.target.value ) {
			console.log( "update todo subtask\n" + event.target.value )
		}
	}

	render() {
		return (
			<div style={ styles.wrapper }>
				<Checkbox style={ styles.checkbox } />
				<TextField 
					fullWidth 
					defaultValue={ this.props.text }
					underlineShow={ this.state.focused }
					onTouchTap={ this.handleTouchTap }
					onBlur={ this.handleBlur }
				/>
				<IconButton style={ styles.deleteButton } onTouchTap={ () => this.props.onDelete( this.props.id ) } >
					<ActionDelete  />
				</IconButton>
			</div>
		);
	}
}

export default Subtask