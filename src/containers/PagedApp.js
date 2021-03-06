import { connect } from 'react-redux';

import { findGoalById } from '../logic/goalSelectors.js';
import { getGoalsWithCompleteness } from '../ducks/goals.js';
import { goBack } from '../ducks/page.js';
import App from '../components/App.js';

const mapStateToProps = state => {
  const goal = findGoalById(
    getGoalsWithCompleteness(state),
    state.page.selectedGoalId
  );

  return {
    selectedGoal: goal,
    title: state.page.selectedGoalId === null ? 'Subgoals' : goal.name,
    hasBack: state.page.history.length > 0
  };
};

const mapDispatchToProps = dispatch => ({
  onGoBack: () => dispatch(goBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);