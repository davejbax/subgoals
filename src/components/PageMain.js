import React, { Component } from 'react';
import GoalList from './GoalList.js';

class PageMain extends Component {

	render() {
		const goals = this.props.goals;
		const onOpenGoal = this.props.onOpenGoal;

		return (
			<div>
				<h2>Daily Goals</h2>
				<p>TODO</p>
				<h2>Goals</h2>
				<GoalList
					goals={goals}
					onOpenGoal={onOpenGoal} />
			</div>
		);
	}

}

export default PageMain;