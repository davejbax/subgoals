import { connect } from 'react-redux';

import { getGoalsWithCompleteness, createGoal, deleteGoal, setGoalName, setGoalColor } from '../ducks/goals.js';
import { setSelectedGoal } from '../ducks/page.js';
import GoalList from '../components/page-main/GoalList.js';
import { openInputDialog, openConfirmDialog, openColorpickerDialog } from '../ducks/dialog.js';
import { getGoalColor } from '../logic/goalProcessing.js';

function onNewGoal(dispatch) {
  dispatch(openInputDialog(
    'Enter goal name',
    (name) => {
      dispatch(createGoal(name));
    },
    () => {}
  ));
}

function onChangeGoalName(dispatch, goal) {
  const goalId = goal.id;
  dispatch(openInputDialog(
    'Enter goal name',
    (name) => {
      dispatch(setGoalName(goalId, name))
    },
    () => {},
    goal.name
  ))
}

function onChangeGoalColor(dispatch, goal) {
  const goalId = goal.id;
  dispatch(openColorpickerDialog(
    'Choose colour',
    (color) => {
      dispatch(setGoalColor(goalId, color));
    },
    () => {},
    getGoalColor(goal)
  ))
}

function onDeleteGoal(dispatch, goal) {
  // TODO: make DRYer; duplicated in EditSubgoalModalContainer.
  const goalId = goal.id;
  dispatch(
    openConfirmDialog(
      'Are you sure you want to delete this goal? This action cannot be undone',
      () => { dispatch(deleteGoal(goalId)); },
      () => {}
    )
  );
}

const mapStateToProps = state => ({
  goals: getGoalsWithCompleteness(state)
});

const mapDispatchToProps = dispatch => ({
  onGoalClick: (goal) => dispatch(setSelectedGoal(goal.id)),
  onNewGoal: () => onNewGoal(dispatch),
  onChangeGoalName: (goal) => onChangeGoalName(dispatch, goal),
  onChangeGoalColor: (goal) => onChangeGoalColor(dispatch, goal),
  onDeleteGoal: (goal) => onDeleteGoal(dispatch, goal)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalList);