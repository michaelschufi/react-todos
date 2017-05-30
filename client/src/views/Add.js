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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

import FOLDER_ICONS from "../constants/folderIcons.js";

import ActionList from 'material-ui/svg-icons/action/list';
import ImageTimelapse from 'material-ui/svg-icons/image/timelapse';
import ImageTimer from 'material-ui/svg-icons/image/timer';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';

import moment from "moment"

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
		browserHistory.goBack();
	}

	handleSaveTap() {
		let subtasks = null;
		if ( this.state.subtasks.indexOf( "\n" ) !== -1 ) {
			subtasks = this.state.subtasks.split( "\n" )
		} else if ( this.state.subtasks.length > 0 ) {
			subtasks = [ this.state.subtasks ]
		}

		let folder = this.state.folder
		let startDateTime = null
		if (    folder === "scheduled" ||
				folder === "today" ||
				folder === "tomorrow" ) {
			let startDate = this.state.startDate || ( folder === "tomorrow" ? moment().add( 1, "days" ).format( "YYYY-MM-DD" ) : moment().format( "YYYY-MM-DD" ) )
			let startTime = this.state.startTime || moment().format( "HH:mm" )
			startDateTime = moment( startDate + startTime, "YYYY-MM-DDHH:mm" ).format( "YYYY-MM-DD HH:mm" )
		}

		let deadline = null
		if ( this.state.startDate ) {
			deadline = this.state.deadlineDate + " " + this.state.deadlineTime
		}

		this.props.addTodo( {
			title: this.state.title.trim(),
			description: this.state.description.trim(),
			startTime: startDateTime,
			estimatedTime: this.state.estimatedTime,
			deadline: deadline,
			folder: folder
		}, subtasks )

		this.setState( {
			typeIcon: FOLDER_ICONS[ "inbox" ],
			folder: "inbox",
			title: "",
			description: "",
			subtasks: "",
			estimatedTime: "",
			startDate: null,
			startTime: null,
			deadlineDate: null,
			deadlineTime: null,
		} )
		// browserHistory.push( "/" + folder )
	}

	handleSelect( event, index, folder ) {
		this.setState( { 
			typeIcon: FOLDER_ICONS[ folder ],
			folder: folder
		} );
	}

	componentWillMount() {
		ValidatorForm.addValidationRule( "isEstTimeString", value => {
			return /^(\d+((:[0-5]\d)|(\.\d{1,2}))?)$/.test( value ) || value === ""
		} )
	}

	render() {
		let startTimeComp = () => {
			switch ( this.state.folder ) {
				case "scheduled":
					return (
						<FormRow leftIcon={ <ActionSchedule /> }>
							<DateTimeField
								key="scheduled"
								floatingLabelText="Start"
								onChange={ ( dateString, timeString ) => this.setState( { startDate: dateString, startTime: timeString } ) }
							/>
						</FormRow>
					)
				case "today":
					return (
						<FormRow leftIcon={ <ActionSchedule /> }>
							<DateTimeField
								key="today"
								floatingLabelText="Start Time"
								fixedDate={ new Date() }
								onChange={ ( dateString, timeString ) => this.setState( { startDate: dateString, startTime: timeString } ) }
							/>
						</FormRow>
					)
				case "tomorrow":
					let date = new Date()
					return (
						<FormRow leftIcon={ <ActionSchedule /> }>
							<DateTimeField
								key="tomorrow"
								floatingLabelText="Start Time"
								fixedDate={ new Date( date.setDate( date.getDate() + 1 ) ) }
								onChange={ ( dateString, timeString ) => this.setState( { startDate: dateString, startTime: timeString } ) }
							/>
						</FormRow>
					)
				default:
					return null
			}
		}

		return (
			<div>
				<ValidatorForm
					ref="form"
					instantValidate={ true }
					onSubmit={ this.handleSaveTap }
				>
					<AppBar
						title="Add Task"
						iconElementLeft={ <IconButton onTouchTap={ this.handleBackButtonTap } > <ArrowBack /> </IconButton> }
						iconElementRight={ <FlatButton label="Save" type="submit" /> }
						// iconElementRight={ <FlatButton label="Save" onTouchTap={ this.handleSaveTap } /> }
					/>
					<Paper rounded={ false } style={ styles.paper }>
						<FormRow style={ styles.firstRow }>
							<TextValidator
								name="title"
								validators={ [ "trim" ] }
								errorMessages={ [ 'Please provide a title.' ] }
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

						{ startTimeComp() }

						<FormRow leftIcon={ <ImageTimelapse /> }>
							<TextValidator
								name="estimatedTime"
								validators={ [ "isEstTimeString" ] }
								errorMessages={ [ 'In hours, e.g. for 90 minutes: "1:30" or "1.5".' ] }
								value={ this.state.estimatedTime }
								onChange={ e => this.setState( { estimatedTime: e.target.value } ) }
								fullWidth
								floatingLabelText="Estimated Time (h)"
								hintText="1:30 / 1.5"
							/>
						</FormRow>

						<FormRow leftIcon={ <ImageTimer /> }>
							<DateTimeField floatingLabelText="Deadline" onChange={ ( dateString, timeString ) => this.setState( { deadlineDate: dateString, deadlineTime: timeString } ) } />
						</FormRow>
					</Paper>
				</ValidatorForm>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		todos: state.todos
	}
}


const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addTodo: ( todo, subtasks=null ) => {
			dispatch( addTodo( todo, subtasks ) )
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Add );