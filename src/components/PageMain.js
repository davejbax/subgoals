import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setSelectedGoal } from '../actions/page.js';
import InteractiveGoalList from '../containers/InteractiveGoalList.js';

const PageMain = ({ goals, setSelectedGoal }) =>
	<div>
		<h2>Daily Goals</h2>
		<p>TODO</p>
		<h2>Goals</h2>
		<InteractiveGoalList />
	</div>;

export default PageMain;