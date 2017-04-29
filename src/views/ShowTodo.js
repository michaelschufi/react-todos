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

import ImageEdit from "material-ui/svg-icons/image/edit"
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Subtask from "../components/Subtask"
import AddSubtask from "../components/AddSubtask"


import { List, ListItem } from "material-ui/List"
import Subheader from "material-ui/Subheader"
import FOLDER_ICONS from "../constants/folderIcons"
import ImageTimelapse from "material-ui/svg-icons/image/timelapse"
// import TextField from "material-ui/TextField"

import { toggleTodo } from "../modules/todos"
import { addSubtask, toggleSubtask, updateSubtask, deleteSubtask } from "../modules/subtasks"

const styles = {
	paper: {
		"padding": "4vmin"
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
	subtaskHeader: {
		paddingLeft: 0
	},
	divider: {
		marginTop: "16px",
		marginBottom: "8px"
	},
	wrapper: {
		margin: "24px 0 0 16px"
	},
	list: {
		marginTop: "8px"
	},
	listItem: {
		paddingLeft: "56px"
	},
	leftIcon: {
		fill: ""
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

	render() {
		return (
			<div>
				<AppBar
					title={ "Details" }
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
					<Checkbox style={ styles.title }
						checked={ this.props.todo.done }
						label={ this.props.todo.title }
						onCheck={ () => this.props.toggleTodo( this.props.todo.id ) }
					/>

					<div style={ styles.wrapper }>
						<p style={ styles.description }>{ this.props.todo.description }</p>
						
						<Subheader style={ styles.subtaskHeader }>Subtasks</Subheader>
						
						{ this.props.subtasks.map( ( subtask ) => {
							return (
								<Subtask 
									key={ subtask.id }
									id={ subtask.id }
									text={ subtask.text }
									checked={ subtask.done }
									onCheck={ this.props.toggleSubtask }
									onUpdate={ this.props.updateSubtask }
									onDelete={ this.props.deleteSubtask }
								/>
							)
						} ) }
						<AddSubtask addSubtask={ this.props.addSubtask } todoId={ this.props.todo.id } text="New Task" />
						
					</div>

					<List style={ styles.list }>
					<Subheader>Folder</Subheader>
						<ListItem
							innerDivStyle={ styles.listItem }
							leftIcon={ React.cloneElement( FOLDER_ICONS[ this.props.todo.folder ], { style: styles.leftIcon } ) }
							primaryText={ this.props.todo.folder.replace( /(.)(.*)/, ( matches, m1, m2 ) => {
								return m1.toUpperCase() + m2
							} ) }
						/>
						<Subheader>Estimated Time</Subheader>
						<ListItem
							innerDivStyle={ styles.listItem }
							leftIcon={ <ImageTimelapse style={ styles.leftIcon } /> }
							primaryText={ ( this.props.todo.estimatedTime / 60 ).toString().replace( /(.*)\..*/, "$1" ) + ":" + this.props.todo.estimatedTime % 60 + " h" }
						/>
					</List>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		todo: state.todos.find( todo => { return todo.id === Number( ownProps.params.id ) } ),
		subtasks: state.subtasks.filter( subtask => { return subtask.todoFk === Number( ownProps.params.id ) } ),
		history: state.history
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleTodo: ( id ) => {
			dispatch( toggleTodo( id ) )
		},
		addSubtask: ( id, text ) => {
			dispatch( addSubtask( id, text ) )
		},
		toggleSubtask: ( id ) => {
			dispatch( toggleSubtask( id ) )
		},
		updateSubtask: ( id, text ) => {
			dispatch( updateSubtask( id, text ) )
		},
		deleteSubtask: ( id ) => {
			dispatch( deleteSubtask( id ) )
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( ShowTodo );