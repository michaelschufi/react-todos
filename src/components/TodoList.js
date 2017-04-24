import React, { Component } from 'react';

import { List,ListItem } from "material-ui/List"
import Checkbox from "material-ui/Checkbox"

export class TodoList extends Component {
	render() {
		return (
			<div>
				<List>
					<ListItem
						leftCheckbox={ <Checkbox /> }
						primaryText="Task #1"
					/>
					<ListItem
						leftCheckbox={ <Checkbox /> }
						primaryText="Task #2"
					/>
					<ListItem
						leftCheckbox={ <Checkbox /> }
						primaryText="Task #3"
					/>
					<ListItem
						leftCheckbox={ <Checkbox /> }
						primaryText="Task #4"
					/>
					<ListItem
						leftCheckbox={ <Checkbox /> }
						primaryText="Task #5"
					/>
				</List>
			</div>
		);
	}
}

export default TodoList