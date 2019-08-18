import { connect } from 'react-redux';
import { addSubgoal, moveSubgoal, deleteGoal, toggleGoalComplete } from '../ducks/goals.js';
import { openConfirmDialog } from '../ducks/dialog.js';

import SubgoalList from '../components/page-goal/SubgoalList.js';
import { showNotification } from '../ducks/notifications.js';

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
  onAddSubgoal: (name, goalId) => dispatch(addSubgoal(name, goalId)),
  onDragEnd: (src, dst) => onDragEnd(dispatch, src, dst),
  onDeleteGoal: (goalId) => onDeleteGoal(dispatch, goalId),
  onCompleteGoal: (goalId) => dispatch(toggleGoalComplete(goalId)),
  onErrorNotification: (message) => dispatch(showNotification(
    new Date().getTime(), // Use Unix timestamp as 'unique key'
    message,              // Message to show
    'Dismiss',            // Action text
    5000                  // Dismiss after 5s
  ))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubgoalList);