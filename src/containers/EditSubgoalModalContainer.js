import { connect } from 'react-redux';

import { setGoalName, toggleGoalComplete, deleteGoal } from '../ducks/goals.js';
import { setSelectedGoal } from '../ducks/page.js';
import EditSubgoalModal from '../components/page-goal/EditSubgoalModal.js';
import { findGoalById } from '../logic/goalSelectors.js';

const mapStateToProps = (state, ownProps) => ({
  subgoal: findGoalById(state.goals.goals, ownProps.subgoalId)
});

const mapDispatchToProps = dispatch => ({
  onChangeTitle: (subgoal, title) => dispatch(setGoalName(subgoal.id, title)),
  onToggleComplete: (subgoal) => dispatch(toggleGoalComplete(subgoal.id)),
  onViewChildren: (subgoal) => dispatch(setSelectedGoal(subgoal.id)),
  onDelete: (subgoal) => dispatch(deleteGoal(subgoal.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubgoalModal);