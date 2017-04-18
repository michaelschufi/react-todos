import React, { Component } from 'react';

import { ListItem } from "material-ui/List"

export class FormRow extends Component {
	render() {
		return (
			<ListItem disabled leftIcon={ this.props.leftIcon }>
				<div style={ this.props.style }>
					{ this.props.children }
				</div>
			</ListItem>
		);
	}
}

FormRow.defaultProps = {
	leftIcon: null,
	style: {
		"display": "flex",
		"margin": "-16px 0 0"
	}
};

export default FormRow;