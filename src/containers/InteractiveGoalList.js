import { connect } from 'react-redux';

import { getGoalsWithCompleteness } from '../ducks/goals.js';
import { setSelectedGoal } from '../ducks/page.js';
import GoalList from '../components/page-main/GoalList.js';

const mapStateToProps = state => ({
  goals: getGoalsWithCompleteness(state)
});

const mapDispatchToProps = dispatch => ({
  onGoalClick: (goal) => dispatch(setSelectedGoal(goal.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalList);