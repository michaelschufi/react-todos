import React, { Component } from 'react';
import { browserHistory } from "react-router"
import { connect } from "react-redux"

import AppBar from "material-ui/AppBar"
import IconButton from "material-ui/IconButton"
import ArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"

import Paper from "material-ui/Paper"
import Checkbox from "material-ui/Checkbox"
import Divider from 'material-ui/Divider';

import ImageEdit from "material-ui/svg-icons/image/edit"
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Subtask from "../components/Subtask"
import AddSubtask from "../components/AddSubtask"

import { addSubtask } from "../modules/todos"

const styles = {
	paper: {
		"padding": "5vmin"
	}, 
	buttonStyle: {
		color: 'white'
	},
	title: {
		fontWeight: 500
	},
	description: {
		fontWeight: 400
	},
	divider: {
		marginTop: "24px",
		marginBottom: "16px"
	}
}

export class ShowTodo extends Component {
	constructor( props ) {
		super( props )

		this.handleBackButtonTap = this.handleBackButtonTap.bind( this )
	}

	handleBackButtonTap() {
		browserHistory.goBack()
	}

	handleTextTap() {}

	render() {
		return (
			<div>
				<AppBar
					// title={ this.props.todo.title }
					// title="Details"
					iconElementLeft={ <IconButton onTouchTap={ this.handleBackButtonTap } > <ArrowBack /> </IconButton> }
					iconElementRight={
						<div>
							<IconButton iconStyle={ styles.buttonStyle } onTouchTap={ this.handleEditTap } > <ImageEdit /> </IconButton>
							<IconMenu
								iconButtonElement={
									<IconButton iconStyle={ styles.buttonStyle } onTouchTap={ this.handleMenuTap } > <MoreVertIcon /> </IconButton>
								}
							    targetOrigin={ { horizontal: 'right', vertical: 'top' } }
    							anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
							>
								<MenuItem primaryText="Duplicate" />
							    <MenuItem primaryText="Other Action" />
							</IconMenu>
						</div>
					}
				/>
				<Paper rounded={ false } style={ styles.paper } >
					<Checkbox style={ styles.title } label={ this.props.todo.title } />

					<p style={ styles.description }>{ this.props.todo.description }</p>

					<Divider style={ styles.divider } />

					{ this.props.todo.subtasks.map( ( subtask, id ) => {
						return <Subtask key={ id } text={ subtask } />
					} ) }
					<AddSubtask addSubtask={ this.props.addSubtask } todoId={ this.props.todo.id } text="New Task" />
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		todo: state.todos.find( todo => { return todo.id === Number( ownProps.params.id ) } ),
		history: state.history
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addSubtask: ( id, text ) => {
			dispatch( addSubtask( id, text ) )
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( ShowTodo );