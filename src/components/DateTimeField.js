import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from "moment"
import TextField from "material-ui/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import IconButton from "material-ui/IconButton";
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';


const dateToString = ( date, toTime=false ) => {   
	if ( ! toTime ) {
		return date.getFullYear() + "-" + ( '0' + ( date.getMonth()+1 ) ).slice( -2 ) + '-' + ( '0' + date.getDate() ).slice( -2 );
	} else {
		return ( '0' + date.getHours() ).slice( -2 ) + ':' + ( '0' + date.getMinutes() ).slice( -2 );
	}
}

const styles = {
	div: {
		"display": "flex"
	},
	pickerIcon: {
		"marginTop": "24px"
	},
	timeField: {
		"marginLeft": "2.5vmin"
	},
	datePicker: {
		"display": "none"
	},
	timePicker: {
		"display": "none" 
	}
}

export class DateTimeField extends Component {
	static propTypes = {
		fixedDate: PropTypes.object,
		floatingLabelText: PropTypes.string,
		onChange: PropTypes.func
	};

	static defaultProps = {
		floatingLabelText: "Date",
		onChange: function(){}
	};

	constructor( props ) {
		super( props );

		// let date = this.props.fixedDate;
		// let date = new Date();
		this.state = {
			date: this.props.fixedDate || new Date(),
			dateString: "",
			timeString: ""
		}

		this.handleDatePickerButtonTap = this.handleDatePickerButtonTap.bind( this );
		this.handleTimePickerButtonTap = this.handleTimePickerButtonTap.bind( this );
		this.handleDateFieldChange = this.handleDateFieldChange.bind( this );
		this.handleTimeFieldChange = this.handleTimeFieldChange.bind( this );
		this.handlePickerChange = this.handlePickerChange.bind( this );
	}

	handleDatePickerButtonTap() {
		let newDate;
		let timestamp = Date.parse( this.state.dateString );

		if ( isNaN( timestamp ) ) {
			newDate = new Date();  			
		} else {
			newDate = new Date( timestamp );
		}

		let date = this.state.date;
		date.setDate( newDate.getDate() );      
		date.setMonth( newDate.getMonth() );      
		date.setFullYear( newDate.getFullYear() );

		this.setState( { date: date }, () => {
			this.datePicker.openDialog();
		} );
	}

	handleTimePickerButtonTap() {
		let date = this.state.date;

		let matches = this.state.timeString.match( /(\d{1,2}):(\d{1,2})/ );
		if ( matches ) {
			date.setHours( parseInt( matches[ 1 ], 10 ) || 0 );
			date.setMinutes( parseInt( matches[ 2 ], 10 ) || 0 );
		}

		this.setState( { date: date }, () => {
			this.timePicker.openDialog();
		} );
	}

	handleDateFieldChange( event ) {
		this.setState( { dateString: event.target.value } );
	}

	handleTimeFieldChange( event ) {
		if ( this.state.dateString || event.target.value !== "" ) {
			this.setState( { dateString: dateToString( this.state.date ) } )
		}
		this.setState( { 
			timeString: event.target.value
		} );
	}

	handlePickerChange( event, newDate, picker ) {
		let date = this.state.date;

		if ( picker === "time" ) {
			date.setHours( newDate.getHours() );
			date.setMinutes( newDate.getMinutes() );
		} else if ( picker === "date" ) {
			date.setDate( newDate.getDate() );
			date.setMonth( newDate.getMonth() );
			date.setFullYear( newDate.getFullYear() );
		}


		this.setState( { date }, () => {
			this.setState( {
				dateString: dateToString( this.state.date ),
				timeString: ( this.state.timeString !== "" || picker === "time" ? dateToString( this.state.date, true ) : "" )
			} );
		}  );
	}

	componentWillMount() {
		ValidatorForm.addValidationRule( "isDateString", value => {
			return moment( value, "YYYY-MM-DD", true ).isValid() === true || value === ""
		} )
		ValidatorForm.addValidationRule( "isTimeString", value => {
			return moment( value, "HH:mm", true ).isValid() === true || value === ""
		} )
	}

	componentWillUpdate( nextProps, nextState ) {
		if ( this.state.dateString !== nextState.dateString || this.state.timeString !== nextState.timeString ) {
			this.props.onChange( nextState.dateString, nextState.timeString )
		}
	}

	render() {
		return (
			<div style={ styles.div }>
				{ this.props.fixedDate ? null : ( <TextValidator
						name="date"
						validators={ [ "isDateString" ] }
						fullWidth
						floatingLabelFixed
						floatingLabelText={ this.props.floatingLabelText }
						hintText={ dateToString( new Date() ) }
						value={ this.state.dateString }
						onChange={ this.handleDateFieldChange }
				/> ) }
				{ ( this.props.fixedDate ) ? null : <IconButton onTouchTap={ this.handleDatePickerButtonTap } style={ styles.pickerIcon } > <HardwareKeyboardArrowDown /> </IconButton> }
				<TextValidator
					name="date"
					validators={ [ "isTimeString" ] }
					fullWidth
					floatingLabelFixed
					style={ styles.dateField }
					floatingLabelText={ this.props.floatingLabelText }
					hintText={ dateToString( new Date(), true ) }
					value={ this.state.timeString }
					onChange={ this.handleTimeFieldChange }
				/>
				<IconButton onTouchTap={ this.handleTimePickerButtonTap } style={ styles.pickerIcon } > <HardwareKeyboardArrowDown /> </IconButton>
				<DatePicker 
					disabled
					value={ this.state.date } 
					onChange={ ( event, newDate ) => { this.handlePickerChange( event, newDate, "date" ) } }
					style={ styles.datePicker }
					ref={ ref => this.datePicker = ref }
				/>
				<TimePicker
					disabled
					format="24hr"
					value={ this.state.date } 
					onChange={ ( event, newDate ) => { this.handlePickerChange( event, newDate, "time" ) } }
					style={ styles.timePicker }
					ref={ ref => this.timePicker = ref }
				/>
			</div>
		);
	}
}

export default DateTimeField;