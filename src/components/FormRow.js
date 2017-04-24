import React, { Component } from 'react';

import { ListItem } from "material-ui/List"

export class FormRow extends Component {
	constructor( props ) {
		super( props );
		if ( this.props.leftIcon ) {
			this.state = {
				leftIcon: React.cloneElement( this.props.leftIcon, { style: this.props.leftIconStyle } ) 
			} 
		} else {
			this.state = {
				leftIcon: null 
			}
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.leftIcon ) {
			this.setState( { leftIcon: React.cloneElement( nextProps.leftIcon, { style: nextProps.leftIconStyle } ) } );
		}
	}

	render() {
		return (
			<ListItem disabled leftIcon={ this.state.leftIcon }>
				<div style={ this.props.style }>
					{ this.props.children }
				</div>
			</ListItem>
		);
	}
}

FormRow.defaultProps = {
	leftIcon: null,
	leftIconStyle: {
		"paddingTop": "8px"
	},
	style: {
		"margin": "-32px 0 0"
	}
};

export default FormRow;