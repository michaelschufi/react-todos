import React, { Component } from 'react';

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";

import Paper from "material-ui/Paper";

import FormRow from "../FormRow";

import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import MenuItem from "material-ui/MenuItem";


import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import FOLDER_ICONS from "../../imports/folderIcons.js"

import ActionList from 'material-ui/svg-icons/action/list';
import ImageTimelapse from 'material-ui/svg-icons/image/timelapse';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';

const styles = {
	paper: {
		"padding": "0 5vmin"
	},
	title: {
		"fontWeight": 500
	},
	leftIcon: {
		"paddingTop": "24px"
	},
	pickerIcon: {
		"marginTop": "24px"
	},
	select: {
		"margin": "-16px 0 0 0"
	},
	datePicker: {
		"display": "none" 
	},
	timeField: {
		"marginLeft": "2.5vmin"
	},
	timePicker: {
		"display": "none" 
	}
}

const dateToString = ( date, toTime=false ) => {   
	if ( ! toTime ) {
		return date.getFullYear() + "-" + ( '0' + ( date.getMonth()+1 ) ).slice( -2 ) + '-' + ( '0' + date.getDate() ).slice( -2 );
	} else {
		return ( '0' + date.getHours() ).slice( -2 ) + ':' + ( '0' + date.getMinutes() ).slice( -2 );
	}
}

export class Add extends Component {
	constructor( props ) {
		super( props );

		let date = new Date();
		this.state = {
			typeIcon: React.cloneElement( FOLDER_ICONS[ "inbox" ], { style: styles.leftIcon } ),
			typeValue: "inbox",
			date: date,
			// dateString: dateToString( date ),
			// timeString: dateToString( date, true )
			dateString: "",
			timeString: ""
		}

		this.handleDatePickerButtonTap.bind( this )
	}

	handleBackButtonTap() {
		this.context.router.history.goBack();
	}

	handleSelect( event, index, typeValue ) {
		this.setState( { typeIcon: React.cloneElement( FOLDER_ICONS[ typeValue ], { style: styles.leftIcon } ) } );
		this.setState( { typeValue } );
	}

	changeDateObject( newDate, time=false ) {
		let date = this.state.date;

		if ( ! time ) {
			date.setDate( newDate.getDate() );      
			date.setMonth( newDate.getMonth() );      
			date.setFullYear( newDate.getFullYear() );
		} else {
			date.setHours( newDate.getHours() );      
			date.setMinutes( newDate.getMinutes() );      
		}
		return date;
	}

	handleDatePickerButtonTap() {
		let timestamp = Date.parse( this.state.dateString );
		if ( ! isNaN( timestamp ) ) {
			let date = new Date( timestamp );
			let newDate =  this.changeDateObject( date );
			this.setState( { date: newDate }, () => {
				this.refs.datePicker.openDialog();
				console.log( this.state.date );
			} );
		} else {
			console.log( "date string invalid\n{this.state.dateString}" );
		}
	}

	handleTimePickerButtonTap() {
		let matches = this.state.timeString.match( /(\d{1,2}):(\d{1,2})/ ); 
		let date = this.state.date;
		date.setHours( parseInt( matches[ 1 ] ) || 0 );
		date.setMinutes( parseInt( matches[ 2 ] ) || 0 );
		this.setState( { date: date }, () => {
			this.refs.timePicker.openDialog();
		} );
	}

	handleDateFieldChange( event ) {
		this.setState( { dateString: event.target.value } );
	}

	handleTimeFieldChange( event ) {
		this.setState( { timeString: event.target.value } );
	}

	handlePickerChange( event, date ) {
		console.log( "hi" )
		this.setState( { date }, () => {
			console.log( this.state.date )
			this.setState( {
				dateString: dateToString( this.state.date ),
				timeString: dateToString( this.state.date, true )
			} );
		}  );
	}

	render() {
		return (
			<div>
				<AppBar
					title="Add Task"
					iconElementLeft={ <IconButton onTouchTap={ this.handleBackButtonTap.bind( this ) } > <ArrowBack /> </IconButton> }
					iconElementRight={ <FlatButton label="Save" /> }
				/>
				<Paper rounded={ false } style={ styles.paper }>
					<FormRow>
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
					<FormRow leftIcon={ <ActionList style={ styles.leftIcon } /> } >
						<TextField
							fullWidth
							floatingLabelText="Subtasks"
							hintText={ "Subtask 1" }
							multiLine
						/>
					</FormRow>
					{ /*<FormRow style={ null } leftIcon={ <ActionList /> } >
						<Checkbox />
					</FormRow>*/ }
					<FormRow style={ styles.select } leftIcon={ this.state.typeIcon } >
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
					<FormRow leftIcon={ <ImageTimelapse style={ styles.leftIcon } /> }>
						<TextField
							fullWidth
							floatingLabelText="Estimated Time (h)"
							hintText="1.5"
						/>
					</FormRow>		
					<FormRow leftIcon={ <ActionSchedule style={ styles.leftIcon } /> }>
						<TextField 
							fullWidth
							floatingLabelText="Deadline (Date)"
							hintText={ dateToString( this.state.date ) }
							value={ this.state.dateString }
							onChange={ this.handleDateFieldChange }
						/>
						<IconButton onTouchTap={ this.handleDatePickerButtonTap } style={ styles.pickerIcon } > <HardwareKeyboardArrowDown /> </IconButton>
						<TextField
							fullWidth
							style={ styles.dateField }
							floatingLabelText="Deadline (Time)"
							hintText={ dateToString( this.state.date, true ) }
							value={ this.state.timeString }
							onChange={ this.handleTimeFieldChange }
						/>
						<IconButton onTouchTap={ this.handleTimePickerButtonTap } style={ styles.pickerIcon } > <HardwareKeyboardArrowDown /> </IconButton>
						<DatePicker 
							disabled
							value={ this.state.date } 
							onChange={ this.handlePickerChange }
							style={ styles.datePicker }
							ref="datePicker"
						/>
						<TimePicker
							disabled
							value={ this.state.date } 
							onChange={ this.handlePickerChange }
							style={ styles.timePicker }
							ref="timePicker"
						/>
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