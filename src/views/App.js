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
	}

	toggleDrawer() {
		this.setState( { 
			drawerOpen: !this.state.drawerOpen
		} );
	}

	handleFabTap() {
		browserHistory.push( "/add" );
	}

	render() {
		return (
			<div id="app">
				<AppBar 
					title="Inbox"
					onLeftIconButtonTouchTap={ this.toggleDrawer.bind( this ) }
				/>
				<Drawer
					docked={ false }
					open={ this.state.drawerOpen }
					onRequestChange={ this.toggleDrawer.bind( this ) }
				>
					<List>
						<ListItem primaryText="Inbox" leftIcon={ FOLDER_ICONS[ "inbox" ] } />
					</List>
					<Divider />
					<List>
						<ListItem primaryText="Today" leftIcon={ FOLDER_ICONS[ "today" ] } />
						<ListItem primaryText="Tomorrow" leftIcon={ FOLDER_ICONS[ "tomorrow" ] } />
						<ListItem primaryText="Next" leftIcon={ FOLDER_ICONS[ "next" ] } />
						<ListItem primaryText="Scheduled" leftIcon={ FOLDER_ICONS[ "scheduled" ] } />
						<ListItem primaryText="Someday" leftIcon={ FOLDER_ICONS[ "someday" ] } />
						<ListItem primaryText="Waiting" leftIcon={ FOLDER_ICONS[ "waiting" ] } />
					</List>
					<Divider />
				</Drawer>
				<TodoList />
				<FloatingActionButton
					style={ styleFab }
					onTouchTap={ this.handleFabTap.bind( this ) }
				>
      				<ContentAdd />
      			</FloatingActionButton>
			</div>
		);
	}
}

export default App;