import React, { Component } from 'react';
import { calculateGoalProgress, getGoalColor } from '../../logic/goalProcessing.js';
import './GoalList.scss';

class GoalList extends Component {

  render() {
    const onGoalClick = this.props.onGoalClick;
    const goalList = this.props.goals.map((goal) =>
      <GoalListItem
        goal={goal}
        key={goal.id}
        onGoalClick={onGoalClick}
        onChangeGoalColor={this.props.onChangeGoalColor}
        onChangeGoalName={this.props.onChangeGoalName}
        onDeleteGoal={this.props.onDeleteGoal}
      />
    );

    return (
      <ul className="goal-list">
        {goalList}
        <li
          key="dummy"
          onClick={this.props.onNewGoal}
          className="goal-list__item dummy"
        >
          <h3><i className="fas fa-plus"></i> Create new goal</h3>
        </li>
      </ul>
    );
  }
  
}

const GoalListItem = ({ goal, onGoalClick, onChangeGoalName, onChangeGoalColor, onDeleteGoal }) =>
  <li
    key={goal.id}
    onClick={() => onGoalClick(goal)}
    className={`goal-list__item bg-${goal.color || getGoalColor(goal)}`}
  >
    <h3>{goal.name}</h3>
    <span>{Math.floor(calculateGoalProgress(goal) * 100)}%</span>
    <div className="button-group">
      <button onClick={(e) => {e.stopPropagation(); onChangeGoalName(goal)}}>
        <i className="fas fa-pen"></i>
      </button>
      <button onClick={(e) => {e.stopPropagation(); onChangeGoalColor(goal)}}>
        <i className="fas fa-palette"></i>
      </button>
      <button onClick={(e) => {e.stopPropagation(); onDeleteGoal(goal)}}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  </li>;
      
export default GoalList;