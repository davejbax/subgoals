import React, { Component } from 'react';
import { calculateGoalProgress } from '../../logic/goalProcessing.js';
import './GoalList.scss';

class GoalList extends Component {

  render() {
    const onGoalClick = this.props.onGoalClick;
    const goalList = this.props.goals.map((goal) =>
      <GoalListItem
        goal={goal}
        onGoalClick={onGoalClick} />
    );

    return (
      <ul className="goal-list">
        {goalList}
      </ul>
    );
  }
  
}

const GoalListItem = ({ goal, onGoalClick }) =>
  <li
    key={goal.id}
    onClick={() => onGoalClick(goal)}
    className={`goal-list__item bg-${goal.color}`}
  >
    <h3>{goal.name}</h3>
    <span>{calculateGoalProgress(goal) * 100}%</span>
  </li>;
      
export default GoalList;