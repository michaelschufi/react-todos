import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import { addTodo } from "../modules/todos"
import { connect } from "react-redux"

// For AppBar
import AppBar from "material-ui/AppBar";
import ArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";

import Paper from "material-ui/Paper";

import FormRow from "../components/FormRow";
import DateTimeField from "../components/DateTimeField";

import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import FOLDER_ICONS from "../constants/folderIcons.js";

import ActionList from 'material-ui/svg-icons/action/list';
import ImageTimelapse from 'material-ui/svg-icons/image/timelapse';
import ImageTimer from 'material-ui/svg-icons/image/timer';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';

const styles = {
	paper: {
		"padding": "0 2vmin"
	},
	firstRow: {
		"margin": "-16px 0 0"
	},
	title: {
		"fontWeight": 500
	}
};

export class Add extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			typeIcon: FOLDER_ICONS[ "inbox" ],
			folder: "inbox",
			title: "",
			description: "",
			subtasks: "",
			estimatedTime: ""
		};

		this.handleBackButtonTap = this.handleBackButtonTap.bind( this ); 
		this.handleSaveTap = this.handleSaveTap.bind( this ); 
		this.handleSelect = this.handleSelect.bind( this ); 
	}

	handleBackButtonTap() {
		browserHistory.push( "/" );
	}

	handleSaveTap() {
		this.props.onSave( {
			title: this.state.title,
			description: this.state.description,
			subtasks: ( this.state.subtasks.indexOf( "\n" ) === -1 ? [] : this.state.subtasks.split( "\n" ) ),
			folder: this.state.folder,
			estimatedTime: this.state.estimatedTime
		} )
	}

	handleSelect( event, index, folder ) {
		this.setState( { 
			typeIcon: FOLDER_ICONS[ folder ],
			folder: folder
		} );
	}

	render() {
		return (
			<div>
				<AppBar
					title="Add Task"
					iconElementLeft={ <IconButton onTouchTap={ this.handleBackButtonTap } > <ArrowBack /> </IconButton> }
					iconElementRight={ <FlatButton label="Save" onTouchTap={ this.handleSaveTap } /> }
				/>
				{ /*<a onClick={ () => browserHistory.push( "/show/1" ) } >Link</a>*/ }
				<Paper rounded={ false } style={ styles.paper }>
					<FormRow style={ styles.firstRow }>
						<TextField
							value={ this.state.title }
							onChange={ e => this.setState( { title: e.target.value } ) }
							fullWidth
							style={ styles.title }
							floatingLabelText="Title"
							hintText="Title"
						/>
					</FormRow>
					<FormRow>
						<TextField
							value={ this.state.description }
							onChange={ e => this.setState( { description: e.target.value } ) }
							fullWidth
							floatingLabelText="Description"
							hintText="Description"
							multiLine
						/>
					</FormRow>
					<FormRow leftIcon={ <ActionList /> } >
						<TextField
							value={ this.state.subtasks }
							onChange={ e => this.setState( { subtasks: e.target.value } ) }
							fullWidth
							floatingLabelText="Subtasks"
							hintText={ "Subtask 1" }
							multiLine
						/>
					</FormRow>
					<FormRow leftIcon={ this.state.typeIcon } >
						<SelectField
							fullWidth
							floatingLabelText="Folder"
							hintText="Type"
							value={ this.state.folder }
							onChange={ this.handleSelect }
						>
							<MenuItem value="inbox" primaryText={ "Inbox" } leftIcon={ FOLDER_ICONS[ "inbox" ] } />
							<MenuItem value="today" primaryText={ "Today" } leftIcon={ FOLDER_ICONS[ "today" ] } />
							<MenuItem value="tomorrow" primaryText={ "Tomorrow" } leftIcon={ FOLDER_ICONS[ "tomorrow" ] } />
							<MenuItem value="next" primaryText={ "Next" } leftIcon={ FOLDER_ICONS[ "next" ] } />
							<MenuItem value="scheduled" primaryText={ "Scheduled" } leftIcon={ FOLDER_ICONS[ "scheduled" ] } />
							<MenuItem value="someday" primaryText={ "Someday" } leftIcon={ FOLDER_ICONS[ "someday" ] } />
							<MenuItem value="waiting" primaryText={ "Waiting" } leftIcon={ FOLDER_ICONS[ "waiting" ] } />
						</SelectField>
					</FormRow>
					<FormRow leftIcon={ <ImageTimelapse /> }>
						<TextField
							value={ this.state.estimatedTime }
							onChange={ e => this.setState( { estimatedTime: e.target.value } ) }
							fullWidth
							floatingLabelText="Estimated Time"
							hintText="1:30 / 1.5"
						/>
					</FormRow>
					<FormRow leftIcon={ <ImageTimer /> }>
						<DateTimeField floatingLabelText="Deadline" onChange={ ( dateString, timeString ) => this.setState( { deadlineDate: dateString, deadlineTime: timeString } ) } />
					</FormRow>
					<FormRow leftIcon={ <ActionSchedule /> }>
						<DateTimeField floatingLabelText="Start" onChange={ ( dateString, timeString ) => this.setState( { startDate: dateString, startTime: timeString } ) } />
					</FormRow>
				</Paper>
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
		onSave: todo => {
			dispatch( addTodo( todo ) )
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Add );