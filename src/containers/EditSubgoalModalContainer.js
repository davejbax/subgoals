import { connect } from 'react-redux';

import { setGoalName, toggleGoalComplete, deleteGoal, getGoalsWithCompleteness } from '../ducks/goals.js';
import { setSelectedGoal } from '../ducks/page.js';
import EditSubgoalModal from '../components/page-goal/EditSubgoalModal.js';
import { findGoalById } from '../logic/goalSelectors.js';
import { openConfirmDialog } from '../ducks/dialog.js';

function onDelete(dispatch, subgoal, onDeleted) {
  const subgoalId = subgoal.id;
  dispatch(
    openConfirmDialog(
      'Are you sure you want to delete this goal? This action cannot be undone',
      () => {
        dispatch(deleteGoal(subgoalId));
        onDeleted();
      },
      () => {}
    )
  );
}

const mapStateToProps = (state, ownProps) => ({
  subgoal: findGoalById(getGoalsWithCompleteness(state), ownProps.subgoalId)
});

const mapDispatchToProps = dispatch => ({
  onChangeTitle: (subgoal, title) => dispatch(setGoalName(subgoal.id, title)),
  onToggleComplete: (subgoal) => dispatch(toggleGoalComplete(subgoal.id)),
  onViewChildren: (subgoal) => dispatch(setSelectedGoal(subgoal.id)),
  onDelete: (subgoal, onDeleted) => onDelete(dispatch, subgoal, onDeleted)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubgoalModal);