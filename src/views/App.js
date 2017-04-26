import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import TodoList from "../components/TodoList";

import FOLDER_ICONS from "../constants/folderIcons.js"

import ContentAdd from 'material-ui/svg-icons/content/add';

const styleFab = {
	position: "fixed",
	bottom: "20px",
	right: "20px"
}

export class App extends Component {
	constructor() {
		super();
		this.state = { 
			drawerOpen: false
		};

		this.handleNavigation = this.handleNavigation.bind( this )
		this.toggleDrawer = this.toggleDrawer.bind( this )
	}

	toggleDrawer() {
		this.setState( {
			drawerOpen: !this.state.drawerOpen
		} );
	}

	handleNavigation( path ) {
		browserHistory.push( path );
		this.toggleDrawer()
	}

	render() {
		return (
			<div id="app">
				<AppBar 
					title="Inbox"
					onLeftIconButtonTouchTap={ this.toggleDrawer }
				/>
				<Drawer
					docked={ false }
					open={ this.state.drawerOpen }
					onRequestChange={ this.toggleDrawer }
				>
					<List>
						<ListItem 
							primaryText="Inbox"
							leftIcon={ FOLDER_ICONS[ "inbox" ] }
							onTouchTap={ () => this.handleNavigation( "/inbox" ) }
						/>
					</List>
					<Divider />
					<List>
						<ListItem
							primaryText="Today"
							leftIcon={ FOLDER_ICONS[ "today" ] }
							onTouchTap={ () => this.handleNavigation( "/today" ) }
						/>
						<ListItem 
							primaryText="Tomorrow"
							leftIcon={ FOLDER_ICONS[ "tomorrow" ] }
							onTouchTap={ () => this.handleNavigation( "/tomorrow" ) }
						/>
						<ListItem 
							primaryText="Next"
							leftIcon={ FOLDER_ICONS[ "next" ] }
							onTouchTap={ () => this.handleNavigation( "/next" ) }
						/>
						<ListItem 
							primaryText="Scheduled"
							leftIcon={ FOLDER_ICONS[ "scheduled" ] }
							onTouchTap={ () => this.handleNavigation( "/scheduled" ) }
						/>
						<ListItem 
							primaryText="Someday"
							leftIcon={ FOLDER_ICONS[ "someday" ] }
							onTouchTap={ () => this.handleNavigation( "/someday" ) }
						/>
						<ListItem 
							primaryText="Waiting"
							leftIcon={ FOLDER_ICONS[ "waiting" ] }
							onTouchTap={ () => this.handleNavigation( "/waiting" ) }
						/>
					</List>
					<Divider />
				</Drawer>
				<TodoList folder={ this.props.params.folder } />
				<FloatingActionButton
					style={ styleFab }
					onTouchTap={ () => this.handleNavigation( "/add" ) }
				>
      				<ContentAdd />
      			</FloatingActionButton>
			</div>
		);
	}
}

export default App;