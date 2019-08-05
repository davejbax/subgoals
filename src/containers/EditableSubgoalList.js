import { connect } from 'react-redux';
import { addSubgoal, moveSubgoal, deleteGoal, toggleGoalComplete } from '../ducks/goals.js';
import { openConfirmDialog } from '../ducks/dialog.js';

import SubgoalList from '../components/page-goal/SubgoalList.js';

function onAddKeyPress(dispatch, e, goalId) {
  if (e.key === 'Enter' && !e.shiftKey) {    
    dispatch(addSubgoal(e.target.textContent, goalId));
    e.preventDefault();
    e.target.textContent = '';
  }
}

function onDragEnd(dispatch, src, dst) {
  dispatch(moveSubgoal(src, dst));
}

function onDeleteGoal(dispatch, goalId) {
  // TODO: make DRYer; duplicated in EditSubgoalModalContainer.
  dispatch(
    openConfirmDialog(
      'Are you sure you want to delete this goal? This action cannot be undone',
      () => { dispatch(deleteGoal(goalId)); },
      () => {}
    )
  );
}

const mapStateToProps = state => ({
  newSubgoalDepth: state.page.newSubgoalDepth
});

const mapDispatchToProps = dispatch => ({
  onAddKeyPress: (e, goalId) => onAddKeyPress(dispatch, e, goalId),
  onDragEnd: (src, dst) => onDragEnd(dispatch, src, dst),
  onDeleteGoal: (goalId) => onDeleteGoal(dispatch, goalId),
  onCompleteGoal: (goalId) => dispatch(toggleGoalComplete(goalId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubgoalList);