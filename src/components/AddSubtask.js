import React, { Component } from 'react';
import PropTypes from "prop-types"

import ContentAdd from "material-ui/svg-icons/content/add"
import Checkbox from "material-ui/Checkbox"
import TextField from "material-ui/TextField"

const styles = { 
	wrapper: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row"
	},
	checkbox: { 
		width: "auto",
		display: "inline-block"
	}
}


export class AddSubtask extends Component {
	static propTypes = {
		text: PropTypes.string,
		todoId: PropTypes.number.isRequired,
		addSubtask: PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props )

		this.handleKeyDown = this.handleKeyDown.bind( this )
	}

	handleKeyDown( event ) {
		if ( event.key === "Enter" ) {
			this.props.addSubtask( this.props.todoId, event.target.value )
			event.target.value = ""
		}
	}

	render() {
		return (
			<div style={ styles.wrapper }>
				<Checkbox
					disabled
					uncheckedIcon={ <ContentAdd /> }
					checkedIcon={ <ContentAdd /> }
					style={ styles.checkbox } />
				<TextField
					fullWidth
					hintText={ this.props.text }
					onKeyDown={ this.handleKeyDown }
					// underlineShow={ this.state.focused }
					// onTouchTap={ this.handleTouchTap }
					// onBlur={ this.handleBlur }
				/>
			</div>
		);
	}
}

export default AddSubtask