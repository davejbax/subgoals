import { connect } from 'react-redux';

import { setSelectedGoal } from '../actions/page.js';
import GoalList from '../components/GoalList.js';

const mapStateToProps = state => ({
  goals: state.goals.goals
});

const mapDispatchToProps = dispatch => ({
  onGoalClick: (goal) => dispatch(setSelectedGoal(goal.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalList);