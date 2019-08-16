import { connect } from 'react-redux';

import { setGoalName, toggleGoalComplete, deleteGoal, getGoalsWithCompleteness, addToDaily, removeLatestFromDaily, setDailyType, configureDailyType } from '../ducks/goals.js';
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

function onMarkDay(dispatch, subgoal, date) {
  const now = new Date();

  // If we are marking today, then use now's time as well. 
  if (date.getFullYear() === now.getFullYear()
      && date.getMonth() === now.getMonth()
      && date.getDate() === now.getDate()) {
    dispatch(addToDaily(subgoal.id, now.toISOString()));
  } else {
    dispatch(addToDaily(subgoal.id, date.toISOString()));
  }
}

function onUnmarkDay(dispatch, subgoal, date) {
  dispatch(removeLatestFromDaily(subgoal.id, date.toISOString()));
}

const mapStateToProps = (state, ownProps) => ({
  subgoal: findGoalById(getGoalsWithCompleteness(state), ownProps.subgoalId)
});

const mapDispatchToProps = dispatch => ({
  onChangeTitle: (subgoal, title) => dispatch(setGoalName(subgoal.id, title)),
  onToggleComplete: (subgoal) => dispatch(toggleGoalComplete(subgoal.id)),
  onViewChildren: (subgoal) => dispatch(setSelectedGoal(subgoal.id)),
  onDelete: (subgoal, onDeleted) => onDelete(dispatch, subgoal, onDeleted),
  onMarkDay: (subgoal, date) => onMarkDay(dispatch, subgoal, date),
  onUnmarkDay: (subgoal, date) => onUnmarkDay(dispatch, subgoal, date),
  onChangeDailyType: (subgoal, type) => dispatch(setDailyType(subgoal.id, type)),
  onConfigureDailyType: (subgoal, config) => dispatch(configureDailyType(subgoal.id, config))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubgoalModal);