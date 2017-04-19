import React, { Component } from 'react';

// For AppBar
import AppBar from "material-ui/AppBar";
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";

import Paper from "material-ui/Paper";

import FormRow from "../FormRow";
import DateTimeField from "../DateTimeField";

import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import FOLDER_ICONS from "../../imports/folderIcons.js"

import ActionList from 'material-ui/svg-icons/action/list';
import ImageTimelapse from 'material-ui/svg-icons/image/timelapse';
import ImageTimer from 'material-ui/svg-icons/image/timer';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';

const styles = {
	paper: {
		"padding": "0 5vmin"
	},
	firstRow: {
		"margin": "-16px 0 0"
	},
	title: {
		"fontWeight": 500
	}
}

export class Add extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			typeIcon: FOLDER_ICONS[ "inbox" ],
			typeValue: "inbox"
		}

		this.handleSelect = this.handleSelect.bind( this ); 
		this.handleBackButtonTap = this.handleBackButtonTap.bind( this ); 
	}

	handleBackButtonTap() {
		this.context.router.history.push( "/" );
	}

	handleSelect( event, index, typeValue ) {
		this.setState( { 
			typeIcon: FOLDER_ICONS[ typeValue ],
			typeValue: typeValue
		} );
	}

	onDeadlineUpdate( date ) {
		// console.log( date )
	}

	render() {
		return (
			<div>
				<AppBar
					title="Add Task"
					iconElementLeft={ <IconButton onTouchTap={ this.handleBackButtonTap } > <ArrowBack /> </IconButton> }
					iconElementRight={ <FlatButton label="Save" /> }
				/>
				<Paper rounded={ false } style={ styles.paper }>
					<FormRow style={ styles.firstRow }>
						<TextField 
							fullWidth
							style={ styles.title }
							floatingLabelText="Title"
							hintText="Title"
						/>
					</FormRow>
					<FormRow>
						<TextField
							fullWidth
							floatingLabelText="Description"
							hintText="Description"
							multiLine
					/>
					</FormRow>
					<FormRow leftIcon={ <ActionList /> } >
						<TextField
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
							value={ this.state.typeValue }
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
							fullWidth
							floatingLabelText="Estimated Time (h)"
							hintText="1.5"
						/>
					</FormRow>
					<FormRow leftIcon={ <ImageTimer /> }>
						<DateTimeField floatingLabelText="Deadline" onWillUpdate={ this.onDeadlineUpdate } />
					</FormRow>
					<FormRow leftIcon={ <ActionSchedule /> }>
						<DateTimeField floatingLabelText="Start Time" />
					</FormRow>
				</Paper>
			</div>
		);
	}
}


Add.contextTypes = {
	router: React.PropTypes.object
} 

export default Add;