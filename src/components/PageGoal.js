import React, { Component } from 'react';
import SubgoalList from './SubgoalList.js';

class PageGoal extends Component {
	render() {
		const goal = this.props.goal;

		return (
			<SubgoalList subgoals={goal.subgoals} />
		);
	}
}

export default PageGoal;