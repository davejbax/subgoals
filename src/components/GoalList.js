import React, { Component } from 'react';
import {calculateGoalProgress} from '../logic/goal-processing.js';
import './GoalList.scss';

class GoalList extends Component {

	render() {
		const goalList = [];
		const onOpenGoal = this.props.onOpenGoal;

    this.props.goals.forEach((goal) => {
      goalList.push(
        <GoalListItem
          goal={goal}
          onClick={() => onOpenGoal(goal)} />
      );
    });

    return (
      <ul className="goal-list">
        {goalList}
      </ul>
    );
	}
	
}

class GoalListItem extends Component {

	render() {
		const goal = this.props.goal;
		const onClick = this.props.onClick;
		return (
			<li
				key={goal.id}
				onClick={onClick}
				className={`goal-list__item bg-${goal.color}`}
			>
				<h3>{goal.name}</h3>
				<span>{calculateGoalProgress(goal) * 100}%</span>
			</li>
		);
	}

}

export default GoalList;