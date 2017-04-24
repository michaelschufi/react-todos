import React from "react";

import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionToday from "material-ui/svg-icons/action/today";
import ActionEvent from "material-ui/svg-icons/action/event";
import ActionViewList from "material-ui/svg-icons/action/view-list";
import ActionDateRange from "material-ui/svg-icons/action/date-range";
import ImageWbSunny from "material-ui/svg-icons/image/wb-sunny";
import ActionWatchLater from "material-ui/svg-icons/action/watch-later";

const FOLDER_ICONS = {
	inbox: <ContentInbox />,
	today: <ActionToday />,
	tomorrow: <ActionEvent />,
	next: <ActionViewList />,
	scheduled: <ActionDateRange />,
	someday: <ImageWbSunny />,
	waiting: <ActionWatchLater />
}

export default FOLDER_ICONS;